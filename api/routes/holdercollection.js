import express from "express";

// This will help us connect to the database
import db from "../db.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// gets all the registered users
router.get("/registered", async (req, res) => {
  let collection = db.collection("holdercollection");
  let results = await collection.find({ isRegistered: true }).toArray();
  res.send(results).status(200);
});

// gets all the issued users
router.get("/issued", async (req, res) => {
  let collection = db.collection("holdercollection");
  let results = await collection.find({ isIssued: true }).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = db.collection("holdercollection");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// gets holder information with wallet address
router.get("/holder/:walletAddress", async (req, res) => {
  let collection = db.collection("holdercollection");
  let query = { walletAddress: req.params.walletAddress };
  let result = await collection.findOne(query);
  if (result === null) res.status(404).send("Not found here");
  else res.status(200).send(result);
});
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      _id: new ObjectId(),
      ...req.body,
    };
    let collection = db.collection("holdercollection");
    let result = await collection.insertOne(newDocument);
    console.log(result);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by wallet address.
router.patch("/:walletAddress", async (req, res) => {
  try {
    const query = { walletAddress: req.params.walletAddress };
    console.log(query);
    const updates = {
      $set: {
        name: req.body.name,
        birthyear: req.body.birthyear,
        passportId: req.body.passportId,
        isIssued: req.body.isIssued,
        did: req.body.did,
      },
    };

    let collection = db.collection("holdercollection");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("holdercollection");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
