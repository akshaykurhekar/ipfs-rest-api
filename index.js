const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const pinataSDK = require("@pinata/sdk");
// Use the api keys by specifying your api key and api secret
const pinata = new pinataSDK({
  pinataApiKey: process.env.API_KEY,
  pinataSecretApiKey: process.env.API_SECRET,
});

// import express (after npm install express)
const express = require("express");

// create new express app and save it as "app"
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
// server configuration
const PORT = 8000;

// create a route for the app
app.get("/", (req, res) => {
  res.send("IPFS Service Running ...!");
});

// Add json object on IPFS
app.post("/add-json", async (req, res) => {
  const jsonObject = req.body.data;
  const objectId = req.body.objectId;
  console.log(jsonObject);

  const options = {
    pinataMetadata: {
      name: objectId,
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  pinata
    .pinJSONToIPFS(jsonObject, options)
    .then((result) => {
      //handle results here
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      //handle error here
      console.log(err);
      res.send(err);
    });
});

//Read json object from IPFS
app.post("/read-json", (req, res) => {
  const cid = req.body.cid;
  console.log(cid);

  axios
    .get(`https://ipfs.io/ipfs/${cid}`)
    .then((result) => {
      console.log(result.data);
      res.send(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`IPFS Server running at: http://localhost:${PORT}/`);
});
