import axios from "axios";
import cors from "cors";
import pinataSDK from "@pinata/sdk";
import express from "express";
import router from "./routes/holdercollection.js";
import verify from "./routes/verify.js";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use("/holdercollection", router);
app.use("/verify", verify);

// server configuration
const PORT = 8000;

// Use the api keys by specifying your api key and api secret
const pinata = new pinataSDK({
  pinataApiKey: process.env.API_KEY,
  pinataSecretApiKey: process.env.API_SECRET,
});

// create a route for the app
app.get("/", (req, res) => {
  res.send("IPFS Service Running ...!");
});

// Add json object on IPFS
app.post("/api/add-json", async (req, res) => {
  const jsonObject = req.body.userData;
  const objectId = req.body.objectId;
  console.log(jsonObject);

  const options = {
    pinataMetadata: {
      name: objectId,
      keyvalues: {
        name: "didpassport",
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
app.post("/api/read-json", (req, res) => {
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
