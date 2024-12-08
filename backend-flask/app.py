from flask import Flask, request, jsonify, send_file,make_response
from flask_cors import CORS  # Import Flask-CORS
import os
import requests
import json
from youtube import yt_fun
from twitter import main


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace with your API base URL
def download_file(bucket_name, file_name, output_dir, api_base_url,platform):
    try:
        if platform=="akave":
            url = f"{api_base_url}/buckets/{bucket_name}/files/{file_name}/download"
        else:
            url=file_name
        
        response = requests.get(url, stream=True)  # Use stream=True for large file downloads
        
        if response.status_code == 200:
            os.makedirs(output_dir, exist_ok=True)  # Ensure output directory exists
            file_path = os.path.join(output_dir, "input.mp4")
            
            with open(file_path, "wb") as file:
                for chunk in response.iter_content(chunk_size=8192):  # Download in chunks
                    if chunk:  # Filter out keep-alive chunks
                        file.write(chunk)
            

            print(f"File downloaded: {file_name}")
            return file_path
        else:
            print(f"Failed to download file: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"An error occurred: {e}")

@app.route('/download_blob', methods=['POST'])
def download_blob():
    try:
        # Get JSON data from the request
        data = request.get_json()
        print(data)
        # Validate input
        blob_id = data.get("blobid")
        bucket_name = data.get("bucketname","myBucket")
        platform=data.get("platform")  # Example additional parameter
        if not blob_id or not bucket_name:
            return jsonify({"error": "Missing required parameters: blobid and bucketname"}), 400

        # Define the output directory and file name
        file_name = f"{blob_id}"  # Example: Use blob ID as file name
        file_path = download_file("myBucket", file_name, "./downloads", "http://localhost:8000",platform)
        
        url = "http://127.0.0.1:8000/microservices/editvideo/"

        payload = json.dumps({
        "link": blob_id
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        response_data=response.json()
        # print(data)
        video_link=response_data['link']
        # transcription=data['transcription']
        print(video_link)
        # print(transcription)
        print("gonna do yt shit")
        print(data['description'])
        yt_post=yt_fun("asif",data['description'])
        # print(yt_post)
        tweet_data=main("Saxenasaheb",data['description'])
        response_data = {
        "twitter_data":tweet_data,
        "yt_data": yt_post,
        "video_link": video_link,
        }

        # Return the file as a downloadable response
        return response_data
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
