const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000';

async function apiRequest(method, endpoint, data = null) {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}


const FormData = require('form-data');
const fs = require('fs');

async function uploadFile(bucketName, filePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  
  try {
    const response = await axios.post(`${API_BASE_URL}/buckets/${bucketName}/files`, form, {
      headers: form.getHeaders(),
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}

async function downloadFile(bucketName, fileName, outputDir) {
    try {
      const response = await axios.get(`${API_BASE_URL}/buckets/${bucketName}/files/${fileName}/download`, {
        responseType: 'stream', // Use stream for file downloads in Node.js
      });
  
      const filePath = `./${outputDir}/${fileName}`;
      const writer = fs.createWriteStream(filePath);
  
      response.data.pipe(writer);
  
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
  
      console.log(`File downloaded: ${fileName}`);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }
  

// downloadFile('myBucket','downloaded_sample.png','./')

// uploadFile('myBucket', './index_2.html');

// apiRequest('POST', '/buckets', { bucketName: 'myBucket' });
// apiRequest('GET', '/buckets');
