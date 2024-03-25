import express from "express";
import axios from "axios";
import { initialize } from "zokrates-js";
const verify = express.Router();

// {
//     did : "did:PASS:QmZa891b8uBUezrFtVAxtqHh6NqPHJot8e1eNEPz8sfcme"
// }
// {
//   name: 'Neeraj',
//   birthyear: '2002',
//   walletAddress: '0x51ed281ab28fcb4373d6f1b63d0cdbc6b549bb70',
//   passportId: '0a4bbeaa-e162-46ae-88af-b71e22b79896'
// }

verify.post("/", async (req, res) => {
  let did = req.body.did;
  const cid = did.split(":")[2];

  const userData = await axios.post("http://localhost:8000/api/read-json", {
    cid: cid,
  });
  const birthyear = userData.data.birthyear;
  const zok = await initialize();
  const source =
    "def main(private u64 birthYear) -> u64 {u64 result = if 2024 - birthYear >= 18 {1} else {0}; return result;}";
  const artifacts = zok.compile(source);
  const { witness, output } = zok.computeWitness(artifacts, [birthyear]);
  const keypair = zok.setup(artifacts.program);
  const proof = zok.generateProof(artifacts.program, witness, keypair.pk);
  const isVerified = zok.verify(keypair.vk, proof);
  const resp = {
    output: output,
    isVerified: isVerified,
  };
  res.status(200).send(resp);
});

export default verify;
