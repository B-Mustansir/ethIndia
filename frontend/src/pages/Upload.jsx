import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

export default function Upload() {
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState('')

  const platforms = ['Youtube', 'Twitter', 'Instagram', 'Telegram', '0xPPL']

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) setFile(file)
  }

  const handleUpload = () => {
    if (file && selectedPlatform && description) {
      alert(`Uploading ${file.name} to ${selectedPlatform} with description: ${description}`)
      // Add your upload logic here
    } else {
      alert('Please complete all fie0lds before uploading.')
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #000000, #1a1a1a)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-black text-white rounded-2xl shadow-2xl border border-white">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center tracking-widest uppercase text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Upload File
          </motion.h2>

          {/* Custom File Input Section */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="mb-6 flex flex-col items-center"
          >
            <label className="block mb-2 text-sm font-medium text-white">
              Choose a File
            </label>
            <motion.label
              htmlFor="file-input"
              className="cursor-pointer py-3 px-6 text-sm font-semibold rounded-lg bg-black text-white border border-white hover:bg-gray-900 hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {file ? file.name : 'Select File'}
            </motion.label>
            <input
              id="file-input"
              type="file"
              accept="video/*,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </motion.div>

          {/* Description Input */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="mb-6"
          >
            <label className="block mb-2 text-sm font-medium text-white">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-md bg-black border border-white text-white focus:ring-2 focus:ring-white focus:outline-none"
            />
          </motion.div>

          {/* Platform Selection */}
          <motion.div
            className="mb-6 grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {platforms.map((platform) => (
              <motion.button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`py-2 px-4 text-sm font-semibold rounded-lg border ${
                  selectedPlatform === platform
                    ? 'bg-gray-900 text-white border-white'
                    : 'bg-black text-gray-400 border-white'
                } hover:bg-gray-800 hover:text-gray-300`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {platform}
              </motion.button>
            ))}
          </motion.div>

          {/* Upload Button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleUpload}
              className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 hover:text-gray-300 focus:ring-2 focus:ring-white focus:outline-none border border-white"
            >
              Upload
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
