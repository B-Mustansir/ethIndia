import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";

export function UploadPage() {
  const [selectedPlatforms, setSelectedPlatforms] = React.useState([]);
  const [videoFile, setVideoFile] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [description, setDescription] = React.useState("");

  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files?.[0];
    if (type === "video") {
      setVideoFile(selectedFile);
    } else if (type === "image") {
      setImageFile(selectedFile);
    }
  };

  const handlePlatformSelection = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const uploadCloudinary = async(image) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "ethindia")
    data.append("cloud_name","dwgdjgeor")
    
    const res=await fetch("https://api.cloudinary.com/v1_1/dwgdjgeor/video/upload",{
    method:"post",
    body: data
    })
    const resp= await res.json()
    console.log(resp);
    return resp.url;
     }

  async function callflaskapi(blobId, platform,bucketName="myBucket") {
    const apiUrl = "http://127.0.0.1:5000/download_blob"; // Replace with your Flask server's URL
  
    try {
      const response = await axios.post(
        apiUrl,
        {
          blobid: blobId,
          bucketname: bucketName,
          platform:platform,
          description:description,
          selectedPlatforms:selectedPlatforms
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);


    } catch (error) {
      console.error("Error calling the API:", error.response?.data || error.message);
    }
  }

  async function uploadFile(bucketName, file) {
    const form = new FormData();
    form.append("file", file);
    const API_BASE_URL="http://localhost:8000"
    try {
      console.log("upload file")
      const response = await axios.post(`${API_BASE_URL}/buckets/${bucketName}/files`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);

      
      return response.data.data.Name; // Return response data for further use
    } catch (error) {
      console.error("Error during file upload:", error.response ? error.response.data : error.message);
      throw new Error("File upload failed");
    }
  }
  
  

  const handleSubmit = async() => {

    const video_link=await uploadCloudinary(videoFile);
    const response=await callflaskapi(video_link,"cloudinary");
    

  };

  return (
    <Card className="bg-black text-white w-full  mx-auto p-8 rounded-lg border border-gray-600 relative">
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl font-bold text-center border-b border-gray-500 pb-4">
          Upload Files
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 relative z-10">
        {/* Video and Image Inputs */}
        <div className="flex flex-row justify-center items-center gap-10">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Label htmlFor="video-input" className="text-white font-medium">
              Upload Video
            </Label>
            <div className="flex items-center gap-4 mt-2">
              <label
                htmlFor="video-input"
                className="cursor-pointer px-4 py-2 rounded-lg border border-white hover:border-gray-500 transition-colors"
              >
                {videoFile ? videoFile.name : "Select Video"}
              </label>
              <Input
                id="video-input"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "video")}
              />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Label htmlFor="image-input" className="text-white font-medium">
              Upload Image
            </Label>
            <div className="flex items-center gap-4 mt-2">
              <label
                htmlFor="image-input"
                className="cursor-pointer px-4 py-2 rounded-lg border border-white hover:border-gray-500 transition-colors"
              >
                {imageFile ? imageFile.name : "Select Image"}
              </label>
              <Input
                id="image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "image")}
              />
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Label htmlFor="description" className="text-white font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 bg-black text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
          />
        </motion.div>

        {/* Platform Selection */}
        <motion.div>
          <Label className="text-white font-medium">Select Platforms</Label>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              "Youtube",
              "Twitter",
              "LinkedIn",
              "Instagram",
              "OxPPL",
              "WarpNet",
            ].map((platform) => (
              <Button
                key={platform}
                onClick={() => handlePlatformSelection(platform)}
                className={`py-2 border rounded-md text-sm transition-all ${
                  selectedPlatforms.includes(platform)
                    ? "bg-white text-black border-gray-500"
                    : "bg-black text-white border-gray-600 hover:bg-white hover:text-black"
                }`}
              >
                {platform}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full py-3 text-white bg-black border border-gray-600 hover:bg-white hover:text-black transition-all rounded-lg"
            onClick={handleSubmit}
          >
            Generate
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}

export default UploadPage;
