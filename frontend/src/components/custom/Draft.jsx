import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function Draft() {
  const [title, setTitle] = React.useState("Exciting News Update!");
  const [description, setDescription] = React.useState("");

  return (
    <Card className="bg-gray-900 text-white w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Post Draft</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <video
          controls
          className="w-full rounded-lg bg-gray-800 shadow-md"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="text-gray-300">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 bg-gray-800 text-white rounded-lg"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="text-gray-300">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 bg-gray-800 text-white rounded-lg"
          />
        </motion.div>

        <div className="flex gap-4">
          <Button className="w-full bg-blue-600 text-white py-3 hover:bg-blue-700">
            Submit Changes
          </Button>
          <Button className="w-full bg-green-600 text-white py-3 hover:bg-green-700">
            Post Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
