import os
import requests

def download_file(bucket_name, file_name, output_dir, api_base_url):
    try:
        url = f"{api_base_url}/buckets/{bucket_name}/files/{file_name}/download"
        response = requests.get(url, stream=True)  # Use stream=True for large file downloads
        
        if response.status_code == 200:
            os.makedirs(output_dir, exist_ok=True)  # Ensure output directory exists
            file_path = os.path.join(output_dir, file_name)
            
            with open(file_path, "wb") as file:
                for chunk in response.iter_content(chunk_size=8192):  # Download in chunks
                    if chunk:  # Filter out keep-alive chunks
                        file.write(chunk)
            
            print(f"File downloaded: {file_name}")
        else:
            print(f"Failed to download file: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:
download_file("myBucket", "index.html", "./downloads", "http://localhost:8000")
