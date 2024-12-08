import os
import time
import json
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from openai import AzureOpenAI

def main(twitter_handle,topic):
    # ===================== STEP 1: SCRAPE TWEETS (from 1.py) =====================
    chrome_options = Options()
    chrome_options.add_argument('--disable-logging')
    chrome_options.add_argument('--log-level=3')
    chrome_options.set_capability('goog:loggingPrefs', {'performance': 'ALL'})

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=chrome_options
    )

    # twitter_handle = 'Saxenasaheb'
    url = f'https://x.com/{twitter_handle}'
    driver.get(url)
    time.sleep(5)

    logs = driver.get_log('performance')
    request_ids = {}

    for entry in logs:
        log = json.loads(entry['message'])['message']
        if (log['method'] == 'Network.responseReceived' and 
            'UserTweets' in log['params']['response']['url']):
            request_id = log['params']['requestId']
            request_ids[request_id] = log['params']['response']['url']
        elif (log['method'] == 'Network.loadingFinished' and 
              log['params']['requestId'] in request_ids):
            request_id = log['params']['requestId']
            try:
                response = driver.execute_cdp_cmd('Network.getResponseBody', {'requestId': request_id})
                response_data = json.loads(response['body'])
                # Save the JSON data to a file
                with open('raw_tweets_2.json', 'w', encoding='utf-8') as json_file:
                    json.dump(response_data, json_file, indent=4, ensure_ascii=False)
                print("Response data saved to 'raw_tweets_2.json'")
            except Exception as e:
                print(f"Error retrieving response body: {e}")

    driver.quit()

    # ===================== STEP 2: PARSE TWEETS (from 2.py) =====================
    with open('raw_tweets_2.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    instructions = data.get('data', {}).get('user', {}).get('result', {}).get('timeline_v2', {}).get('timeline', {}).get('instructions', [])

    def extract_tweet_info(tweet_obj):
        # Extract full_text
        full_text = tweet_obj.get('legacy', {}).get('full_text', "")

        # Extract hashtag texts
        entities = tweet_obj.get('legacy', {}).get('entities', {})
        hashtags = entities.get('hashtags', [])
        tags = [tag.get('text', "") for tag in hashtags]

        # Extract views
        views = tweet_obj.get('views', {}).get('count')

        return {
            'description': full_text,
            'tags': tags,
            'views': views
        }

    tweet_data_list = []

    for instruction in instructions:
        inst_type = instruction.get('type')

        # Handle pinned tweet (TimelinePinEntry)
        if inst_type == 'TimelinePinEntry':
            entry = instruction.get('entry', {})
            content = entry.get('content', {})
            item_content = content.get('itemContent', {})
            if item_content.get('itemType') == 'TimelineTweet':
                tweet_result = item_content.get('tweet_results', {}).get('result', {})
                tweet_info = extract_tweet_info(tweet_result)
                tweet_data_list.append(tweet_info)

        # Handle multiple tweets in TimelineAddEntries
        if inst_type == 'TimelineAddEntries':
            entries = instruction.get('entries', [])
            for ent in entries:
                ent_content = ent.get('content', {})
                item_content = ent_content.get('itemContent', {})
                if item_content.get('itemType') == 'TimelineTweet':
                    tweet_result = item_content.get('tweet_results', {}).get('result', {})
                    tweet_info = extract_tweet_info(tweet_result)
                    tweet_data_list.append(tweet_info)

    with open('sorted_tweets.json', 'w', encoding='utf-8') as outfile:
        json.dump(tweet_data_list, outfile, ensure_ascii=False, indent=4)
    print("Results saved to sorted_tweets.json")

    # ===================== STEP 3: CALL OPENAI WITH PERSONA (from 3.py) =====================
    load_dotenv()

    with open("sorted_tweets.json", "r", encoding="utf-8") as file:
        tweets_data = json.load(file)

    def convert_to_text(tweets_data):
        text_data = ""
        for tweet in tweets_data:
            description = tweet["description"]
            tags = ", ".join(tweet["tags"])
            views = tweet["views"]
            text_data += f"Description: {description}\nTags: {tags}\nViews: {views}\n\n"
        return text_data

    def llm_call(topic, context, user_id):
        file_path = "user_personas.json"

        def load_personas():
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as file:
                    return json.load(file)
            return {}

        def save_persona(personas):
            with open(file_path, 'w', encoding='utf-8') as file:
                json.dump(personas, file, indent=4)

        def generate_persona(client, context):
            final_prompt = (f"You are tasked with analyzing a Twitter (now X) content creator's writing style and tone based on "
                            f"their past tweets, including content, hashtags, and engagement metrics. Summarize their persona to "
                            f"capture their unique voice, tone, and key themes. This summary should be detailed and include aspects "
                            f"such as their subject matter, approach, stylistic choices, hooks, trending hashtags, optimum character/word "
                            f"limit to avoid 'Read more', cool and a bit sarcastic tone, and use of web3 slang or web3 specific concepts. "
                            f"Provide 1 or 2 small examples of their tweet style.\n\nHistorical data:\n{str(context)}")

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
            latest_prompt = (f"Using the detailed persona of this Twitter creator: {persona_summary}, generate a suitable tweet "
                             f"for the following topic: {topic}. The tweet should reflect their unique style, voice, and tone, utilizing "
                             f"their characteristic hooks, trending hashtags, cool and slightly sarcastic tone, and web3 slang or web3 specific concepts. "
                             f"Ensure the tweet remains within the optimal character limit to avoid 'Read more'. Include trending hashtags and engaging hooks.")

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
                            "tweet": {"type": "string", "description": "Generate a tweet from the given input"}
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

        generated_tweet = generate_content(client, persona_summary, topic)
        return generated_tweet

    tweets_text = convert_to_text(tweets_data)
    print(tweets_text)
    result=llm_call(topic, f"{tweets_text}", "user1")
    return result

if __name__ == "__main__":
    main()
