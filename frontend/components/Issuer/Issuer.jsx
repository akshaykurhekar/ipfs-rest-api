import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import VerticalTabs from "./VerticalTabs";
import axios from "axios";
import { useMetaMask } from "../../src/hooks/useMetamask";
import { ethers } from "ethers";
const baseUrl = "http://localhost:8000/";
import { DIDIssuerAddress } from "../../src/contracts/DIDIssuerAddress";
import DIDIssuerABI from "../../src/contracts/DIDIssuerABI.json";

const Issuer = () => {
  const [issuedHolders, setIssuedHolders] = useState([]);
  const [unissuedHolders, setUnissuedHolders] = useState([]);
  const [contract, setContract] = useState(null);
  const { wallet, hasProvider, isConnecting, connectMetamask } = useMetaMask();

  useEffect(() => {
    document.title = "Issuer";
    const getAddress = (list) => {
      let arr = [];
      list.map((item) => {
        arr.push(item.walletAddress);
      });
      return arr;
    };
    axios
      .get(`${baseUrl}holdercollection/issued`)
      .then((response) => {
        // console.log(response.data);
        setIssuedHolders(response.data);
      })
      .catch((error) => {
        console.log("Could not get issued holders details", error);
      });
    axios
      .get(`${baseUrl}holdercollection/registered`)
      .then((response) => {
        // console.log(response.data);
        const onlyRegistered = response.data.filter((item) => !item.isIssued);
        const arr = getAddress(onlyRegistered);
        setUnissuedHolders(arr);
      })
      .catch((error) => {
        console.log("Could not get holder details", error);
      });
  }, []);
  return (
    <>
      <h1>Issuer Webpage</h1>
      <VerticalTabs
        issuedHolders={issuedHolders}
        setIssuedHolders={setIssuedHolders}
        unissuedHolders={unissuedHolders}
        setUnissuedHolders={setUnissuedHolders}
      ></VerticalTabs>
    </>
  );
};

export default Issuer;
