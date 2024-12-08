import os
import json
from datetime import datetime, timedelta
import googleapiclient.discovery
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()

def parse_duration(duration_str):
    duration = timedelta()
    time_units = {"H": "hours", "M": "minutes", "S": "seconds"}
    time_value = ""
    for char in duration_str:
        if char.isdigit():
            time_value += char
        elif char in time_units:
            duration += timedelta(**{time_units[char]: int(time_value)})
            time_value = ""
    return duration


def get_channel_videos(api_key, channel_name, output_file=None):
    """
    Fetch videos from a YouTube channel and save them as JSON.
    Returns the list of videos as Python objects.
    """
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=api_key)

    # Find channel by name
    search_response = youtube.search().list(
        q=channel_name,
        type="channel",
        part="id,snippet",
        maxResults=1
    ).execute()

    if not search_response["items"]:
        raise ValueError("Channel not found.")

    channel_id = search_response["items"][0]["id"]["channelId"]

    channel_response = youtube.channels().list(
        part="contentDetails",
        id=channel_id
    ).execute()

    uploads_playlist_id = channel_response["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]

    video_ids = []
    next_page_token = None

    # Retrieve all videos in the uploads playlist
    while True:
        playlist_items_response = youtube.playlistItems().list(
            part="contentDetails",
            playlistId=uploads_playlist_id,
            maxResults=25,
            pageToken=next_page_token
        ).execute()

        for item in playlist_items_response["items"]:
            video_ids.append(item["contentDetails"]["videoId"])

        next_page_token = playlist_items_response.get("nextPageToken")
        if not next_page_token:
            break

    videos = []
    total_duration = timedelta()

    # Fetch video details in batches
    for i in range(0, len(video_ids), 50):
        video_response = youtube.videos().list(
            part="snippet,contentDetails",
            id=",".join(video_ids[i:i+50])
        ).execute()

        for item in video_response["items"]:
            duration_str = item["contentDetails"]["duration"]
            duration = parse_duration(duration_str)
            total_duration += duration

            video_data = {
                "title": item["snippet"]["title"],
                "description": item["snippet"]["description"],
                "tags": item["snippet"].get("tags", []),
                "categoryId": item["snippet"]["categoryId"],
                "videoId": item["id"],
                "videoLink": f"https://www.youtube.com/watch?v={item['id']}",
                "publishDate": item["snippet"]["publishedAt"],
                "duration": str(duration)
            }
            videos.append(video_data)

    # Map categoryIds to actual category names
    category_response = youtube.videoCategories().list(
        part="snippet",
        regionCode="US"
    ).execute()

    category_mapping = {}
    for item in category_response["items"]:
        category_mapping[item["id"]] = item["snippet"]["title"]

    for video in videos:
        video["genre"] = category_mapping.get(video["categoryId"], "Unknown")

    # Sort by publish date descending
    videos.sort(key=lambda x: datetime.strptime(x["publishDate"], "%Y-%m-%dT%H:%M:%SZ"), reverse=True)

    if output_file:
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(videos, f, ensure_ascii=False, indent=4)

    print(f"Total Duration of Videos: {total_duration}")
    return videos


def convert_videos_to_text(videos_data):
    """
    Convert the JSON data of videos into a text format with titles, descriptions, and tags.
    """
    text_data = ""
    for video in videos_data:
        title = video.get("title", "")
        description = video.get("description", "")
        tags = ", ".join(video.get("tags", []))
        text_data += f"Title: {title}\nDescription: {description}\nTags: {tags}\n\n"
    return text_data


def llm_call(topic, context, user_id):
    """
    Use Azure OpenAI to first generate a persona summary from the historical video context,
    then generate a title, description, and tags for a given topic.
    """
    file_path = "user_personas.json"

    def load_personas():
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                return json.load(file)
        return {}

    def save_persona(personas):
        with open(file_path, 'w') as file:
            json.dump(personas, file, indent=4)

    def generate_persona(client, context):
        final_prompt = (
            f"You are tasked with analyzing a YouTube content creator's writing style and tone based on "
            f"their past content, including titles, descriptions, and tags of their videos. Summarize their "
            f"persona to capture their unique voice, tone, and key themes. This summary should be concise "
            f"and include aspects such as their subject matter, approach, and overall style. Also include "
            f"1 or 2 small examples of their writing style.\n\nHere is the Historical data from their YouTube channel:\n{context}"
        )

        messages = [
            {"role": "system", "content": "You are an expert professional copywriter."},
            {"role": "user", "content": final_prompt},
        ]

        final_response = client.chat.completions.create(
            model="mustansir-gpt-4o",
            messages=messages,
        )
        return final_response.choices[0].message.content

    def generate_content(client, persona_summary, topic):
        latest_prompt = (
            f"Using the persona of this YouTube creator: {persona_summary}, generate a suitable title, "
            f"description, and tags for the following topic: {topic}"
        )

        completion = client.chat.completions.create(
            model="mustansir-gpt-4o",
            seed=10,
            messages=[
                {"role": "system", "content": "You are a professional data extractor"},
                {"role": "user", "content": latest_prompt},
            ],
            functions=[{
                "name": "input_prompter",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {"type": "string", "description": "Extract title from given input"},
                        "description": {"type": "string", "description": "Extract description from given input"},
                        "tags": {"type": "array", "items": {"type": "string", "description": "tags given in input"}}
                    }, "required": ["input_prompt"]
                }
            }],
        )
        return completion.choices[0].message.function_call.arguments

    personas = load_personas()
    
    if user_id in personas:
        persona_summary = personas[user_id]
    else:
        client = AzureOpenAI(
            azure_endpoint=os.environ['AZURE_ENDPOINT'],
            api_key=os.environ['AZURE_API_KEY'],
            api_version="2024-08-01-preview"
        )

        persona_summary = generate_persona(client, context)
        personas[user_id] = persona_summary
        save_persona(personas)

    client = AzureOpenAI(
        azure_endpoint=os.environ['AZURE_ENDPOINT'],
        api_key=os.environ['AZURE_API_KEY'],
        api_version="2024-08-01-preview"
    )
    
    generated_text = generate_content(client, persona_summary, topic)
    return generated_text


if __name__ == "__main__":
    # Step 1: Fetch YouTube data
    API_KEY = "AIzaSyDkzVwERIIYxx1KAtEx859YD8I1cnqXcXc"
    CHANNEL_NAME = "SuperteamPodcast"
    output_json_file = f"{CHANNEL_NAME}_videos.json"
    videos = get_channel_videos(API_KEY, CHANNEL_NAME, output_file=output_json_file)

    # Step 2: Process videos data into text
    videos_text = convert_videos_to_text(videos)
    context_file = "videos_context.txt"
    with open(context_file, "w", encoding="utf-8") as f:
        f.write(videos_text)
    print(f"Videos context has been saved to {context_file}")

    # Step 3: Inference with Azure OpenAI
    topic = "Crypto and Blockchain"
    user_id = "user21"
    final_output = llm_call(topic, videos_text, user_id)
    print("YouTube Post:", final_output)


def yt_fun(CHANNEL_NAME,topic):
    API_KEY = "AIzaSyDkzVwERIIYxx1KAtEx859YD8I1cnqXcXc"
    CHANNEL_NAME = "SuperteamPodcast"
    output_json_file = f"{CHANNEL_NAME}_videos.json"
    videos = get_channel_videos(API_KEY, CHANNEL_NAME, output_file=output_json_file)

    # Step 2: Process videos data into text
    videos_text = convert_videos_to_text(videos)
    context_file = "videos_context.txt"
    with open(context_file, "w", encoding="utf-8") as f:
        f.write(videos_text)
    print(f"Videos context has been saved to {context_file}")

    # Step 3: Inference with Azure OpenAI
    # topic = "Crypto and Blockchain"
    user_id = "user21"
    final_output = llm_call(topic, videos_text, user_id)
    print("YouTube Post:", final_output)
    return final_output