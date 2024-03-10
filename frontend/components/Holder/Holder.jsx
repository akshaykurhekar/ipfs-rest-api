import { useEffect, useState } from "react";
import "../../src/styles/Holder.module.css"; // Import your CSS file
import axios from "axios";
import { useMetaMask } from "../../src/hooks/useMetamask";
import { Button } from "@mui/material";

const initialHolderState = {
  name: null,
  age: null,
  isRegistered: false,
  isIssued: false,
};

const Holder = () => {
  const { wallet, hasProvider, isConnecting, connectMetamask } = useMetaMask();

  const [holder, setHolder] = useState(initialHolderState);
  const [requestData] = useState({
    cid: "QmSDW4iayfLWSeBj6SfDU3vUQ6yx5jQgfMeFrz9yQVbmNs", //replace me
  });

  useEffect(() => {
    const updateHolder = async () => {
      setHolder({ ...holder, walletAddress: wallet.accounts[0] });
    };
    console.log("wallet changed");
    updateHolder();
    if (holder.walletAddress) {
      getHolderInfo(holder.walletAddress);
    }
    console.log(holder);
  }, [wallet]);

  const baseUrl = "http://localhost:8000/";
  const createRequest = () => {
    return {
      walletAddress: holder.walletAddress,
      isRegistered: true,
      isIssued: false,
    };
  };
  const registerToDB = async () => {
    try {
      let req = createRequest();
      console.log(req);
      let res = await axios.post(`${baseUrl}holdercollection`, req);
      console.log(res);
    } catch (error) {
      console.log("error while registering holder", error);
    }
  };
  const getHolderInfo = async (walletAddress) => {
    try {
      const response = await axios.get(
        `${baseUrl}holdercollection/holder/${walletAddress}`
      );
      setHolder(response);
      console.log(response);
    } catch (e) {
      setHolder({ ...holder, isRegistered: false });
    }
  };
  const handleConnect = async () => {
    await connectMetamask();
    await getHolderInfo(wallet.accounts[0]);
  };
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/read-json", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setResponse(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setResponse("Error fetching data");
  //   }
  // };

  // WRITE A GENERATE PROOF BUTTON TO SEND THE PROOF TO THE VERIFIER
  // WRITE A VERIFY PROOF BUTTON WHICH WILL CALL THE VERIFIER SMART CONTRACT

  return (
    <>
      <div>
        <h1>Holder Webpage </h1>
      </div>
      <header className="App-header">
        {!hasProvider && (
          <a href="https://metamask.io" target="_blank">
            Install MetaMask
          </a>
        )}
        {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
          <Button disabled={isConnecting} onClick={handleConnect}>
            Connect MetaMask
          </Button>
        )}
      </header>
      {hasProvider && wallet.accounts.length > 0 && (
        <>
          <div>
            Current Wallet Address :{" "}
            <a
              className="text_link tooltip-bottom"
              href={`https://etherscan.io/address/${wallet.accounts[0]}`}
              target="_blank"
              data-tooltip="Open in Block Explorer"
            >
              {wallet.accounts[0]}
            </a>
          </div>
          <div>Wallet Balance: {wallet.balance} ETH</div>
          {holder.isRegistered && holder.isIssued && <div>registered</div>}
          {holder.isRegistered && <div>waiting for issuer</div>}
          {!holder.isRegistered ? (
            <>
              <p> User not Registered yet</p>
              <Button onClick={registerToDB}>Register</Button>
            </>
          ) : (
            <div>User Registered</div>
          )}
        </>
      )}
    </>
  );
};

export default Holder;
