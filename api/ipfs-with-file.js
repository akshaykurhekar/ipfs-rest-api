const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

// Use the api keys by specifying your api key and api secret
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataApiKey: process.env.API_KEY, pinataSecretApiKey: process.env.API_SECRET});

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const fileName = 'image01';
    const src = `file/${fileName}.png`;
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: fileName,
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}

pinFileToIPFS()