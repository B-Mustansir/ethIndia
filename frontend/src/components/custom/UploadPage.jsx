import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export function UploadPage() {
  const [selectedPlatforms, setSelectedPlatforms] = React.useState([]);
  const [videoFile, setVideoFile] = React.useState(null);
  const [imageFiles, setImageFiles] = React.useState([]);
  const [description, setDescription] = React.useState("");

  const handleFileChange = (event, type) => {
    if (type === "video") {
      setVideoFile(event.target.files?.[0]);
    } else if (type === "image") {
      setImageFiles(Array.from(event.target.files));
    }
  };

  const handlePlatformSelection = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = () => {
    const requestPayload = {
      video: videoFile,
      images: imageFiles,
      description,
      platforms: selectedPlatforms,
    };

    console.log("Request Payload:", requestPayload);
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
              Upload Images
            </Label>
            <div className="flex flex-col items-start gap-4 mt-2">
              <label
                htmlFor="image-input"
                className="cursor-pointer px-4 py-2 rounded-lg border border-white hover:border-gray-500 transition-colors"
              >
                Select Images
              </label>
              <Input
                id="image-input"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileChange(e, "image")}
              />
              {imageFiles.length > 0 && (
                <div className="text-sm text-gray-300">
                  Selected images: {imageFiles.map(file => file.name).join(", ")}
                </div>
              )}
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