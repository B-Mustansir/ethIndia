import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export function UploadPage() {
  const [selectedPlatform, setSelectedPlatform] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [description, setDescription] = React.useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  return (
    <Card className="bg-gray-900 text-white w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Upload File</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Input */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Label htmlFor="file-input" className="text-gray-300">
            Choose a File
          </Label>
          <div className="flex items-center gap-4 mt-2">
            <label
              htmlFor="file-input"
              className="cursor-pointer px-4 py-2 rounded-lg bg-gray-800 text-gray-100 hover:bg-gray-700"
            >
              {file ? file.name : "Select File"}
            </label>
            <Input
              id="file-input"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Label htmlFor="description" className="text-gray-300">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 bg-gray-800 text-white border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
        </motion.div>

        {/* Platform Selection */}
        <motion.div>
          <Label className="text-gray-300">Select Platform</Label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {["Youtube", "Twitter", "Instagram", "OxPPL"].map((platform) => (
              <Button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`py-2 ${
                  selectedPlatform === platform
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {platform}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Upload Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
            Upload
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
