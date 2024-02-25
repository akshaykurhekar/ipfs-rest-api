import { useState } from "react";
import "./Holder.css"; // Import your CSS file
import Web3 from "web3";
import ConnectWalletButton from "./ConnectWalletButton.jsx";

const Holder = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const onPressConnect = async () => {
    setLoading(true);

    try {
      if (window?.ethereum?.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = Web3.utils.toChecksumAddress(accounts[0]);
        setAddress(account);
        // register the user in the db
        const response = await fetch("http://localhost:8000/holdercollection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            address: account,
          },
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const onPressLogout = () => setAddress("");
  // FETCH CID FROM BLOCKCHAIN BY CALLING THE MAPPING OF 'record' AND PARSE THE DID;
  // format of DID => did:PASS:<cid>
  // SET THE requestData AS PER THE PARSED DID
  const [requestData] = useState({
    cid: "QmSDW4iayfLWSeBj6SfDU3vUQ6yx5jQgfMeFrz9yQVbmNs", //replace me
  });
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/read-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error fetching data");
    }
  };

  // WRITE A GENERATE PROOF BUTTON TO SEND THE PROOF TO THE VERIFIER
  // WRITE A VERIFY PROOF BUTTON WHICH WILL CALL THE VERIFIER SMART CONTRACT

  return (
    <>
      <header className="App-header">
        <ConnectWalletButton
          onPressConnect={onPressConnect}
          onPressLogout={onPressLogout}
          loading={loading}
          address={address}
        />
      </header>
      <div>
        <h1>Holder Webpage </h1>
      </div>
      <div>
        {" "}
        <button onClick={fetchData}>Fetch Passport Card</button>{" "}
      </div>
      <div className="Holder-container">
        <div>
          <div className="credentials-container">
            <h2>Credentials:</h2>
            <div>
              {response !== null ? (
                <div>
                  <p className="text-style">
                    Name: {response.credentials.name}
                  </p>
                  <p className="text-style">
                    Passport ID: {response.credentials.passportId}
                  </p>
                  <p className="text-style">Age: {response.credentials.age}</p>
                  <p className="text-style">
                    Address: {response.credentials.address}
                  </p>
                </div>
              ) : (
                <p className="text-style">Click the Fetch Data button</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Holder;
