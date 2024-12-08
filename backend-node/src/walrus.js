const axios = require("axios");
const fs = require("fs");

// Function to download a file
async function downloadFile(url, outputFilePath) {
    try {
        const response = await axios.get(url, {
            responseType: "stream", // Ensures the response is a readable stream
        });

        // Pipe the response data to a file
        const writer = fs.createWriteStream(outputFilePath);
        response.data.pipe(writer);

        // Wait for the stream to finish
        await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });

        console.log(`File downloaded successfully to ${outputFilePath}`);
    } catch (error) {
        console.error("Error downloading the file:", error.message);
    }
}

// Example usage
const fileUrl = "https://aggregator.walrus-testnet.walrus.space/v1/Hpvq66NQ9CYKuGkRUjS_AkFQl9787yq7ixDyJe37N04"; // Replace with the file's URL
const savePath = "./downloaded_sample.png"; // Replace with the desired output file path

downloadFile(fileUrl, savePath);
