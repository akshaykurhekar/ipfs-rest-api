import { useEffect, useState } from "react";
import "../../src/styles/Holder.module.css"; // Import your CSS file
import axios from "axios";
import { useMetaMask } from "../../src/hooks/useMetamask.jsx";
import { Button } from "@mui/material";

const initialHolderState = {
  name: null,
  age: null,
  isRegistered: true,
  isIssued: false,
};

const Holder = () => {
  const { wallet, hasProvider, isConnecting, connectMetamask } = useMetaMask();
  const [holder, setHolder] = useState(initialHolderState);
  const [credentials, setCredential] = useState(null);

  useEffect(() => {
    document.title = "Holder";
    const updateHolder = async () => {
      setHolder({ ...holder, walletAddress: wallet.accounts[0] });
    };
    // console.log("wallet changed");
    if (wallet.accounts.length > 0) {
      localStorage.setItem("walletAddress", wallet.accounts[0]);
      updateHolder();
      const aa = localStorage.getItem("walletAddress");
      //  console.log(aa)
      getHolderInfo(aa);
    }
    console.log(holder);
  }, [wallet]);

  const baseUrl = "http://localhost:8000/";

  const createRequest = () => {
    return {
      walletAddress: localStorage.getItem("walletAddress"),
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
      setActiveComponent("registerNotIssued");
    } catch (error) {
      console.log("error while registering holder", error);
    }
  };

  const getHolderInfo = async (walletAddress) => {
    try {
      const response = await axios.get(
        `${baseUrl}holdercollection/holder/${walletAddress}`
      );
      console.log("data from DB:", response);
      if (response.data.isRegistered && response.data.isIssued) {
        setActiveComponent("Issued");
      } else if (response.data.isRegistered) {
        setActiveComponent("registerNotIssued");
      } else {
        setActiveComponent("notRegister");
      }
      setHolder(response);
    } catch (e) {
      setHolder({ ...holder, isRegistered: false });
    }
  };

  const handleConnect = async () => {
    await connectMetamask();
    await getHolderInfo(wallet.accounts[0]);
    setActiveComponent("notRegister");
  };

  const [cid, setCid] = useState(
    "QmbLztjxmKSjGrMGdXK1rxSt4g3wiwcVFRfj3eQnPHDER3"
  );

  const fetchCredential = async () => {
    //get list of cid from DB

    try {
      await axios
        .get(`https://ipfs.io/ipfs/${cid}`)
        .then((result) => {
          console.log(result.data);
          setCredential(result.data);
          //   credentialComponent = credentials.map((item,idx) => {
          //     return (<div key={idx}> <p> {item.name}</p> <p> {item.birthyear}</p> </div>)
          //   })
        })
        .catch((err) => {
          console.log(err);
        });
      setActiveComponent("credential");
    } catch (error) {
      console.error("Error fetching data:", error);
      // setResponse("Error fetching data");
    }
  };

  // WRITE A GENERATE PROOF BUTTON TO SEND THE PROOF TO THE VERIFIER
  // WRITE A VERIFY PROOF BUTTON WHICH WILL CALL THE VERIFIER SMART CONTRACT

  const [message, setMessage] = useState(null);

  const checkIssuedStatus = () => {
    if (holder.isIssued) {
      // fetch cid
      // setCid()
      setActiveComponent("Issued");
    } else {
      setMessage("Watting for issuer to issue credential...!");
      setActiveComponent("registerNotIssued");
    }
  };

  let [activeComponent, setActiveComponent] = useState("notRegister");
  let componentToRender;

  // Switch statement to determine which component to render
  switch (activeComponent) {
    case "notRegister":
      componentToRender = (
        <>
          <p> User not Registered yet...!</p>
          <Button onClick={registerToDB}>Register User</Button>
        </>
      );
      break;
    case "registerNotIssued":
      componentToRender = (
        <>
          <div>
            <h3>User Registered</h3>
            <p>{message}</p>
            <Button onClick={checkIssuedStatus}>
              {" "}
              Check credential status{" "}
            </Button>
          </div>
        </>
      );
      break;
    case "Issued":
      componentToRender = (
        <>
          <div>
            {" "}
            <h3>Credential issued</h3>
            <Button onClick={fetchCredential}> Fetch Credential </Button>
          </div>
        </>
      );
      break;
    case "credential":
      componentToRender = (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            margin: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundImage:
              "linear-gradient(to bottom right, rgb(6 228 146), rgb(208 96 253))",
            color: "black",
          }}
        >
          <p style={{ margin: "8px 0" }}>Name: {credentials.name}</p>
          <p style={{ margin: "8px 0" }}>Birth Year: {credentials.birthyear}</p>
        </div>
      );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h1>Holder Side</h1>
      {/* <MetamaskConnect/> */}
      <header className="App-header">
        {!hasProvider && (
          <a href="https://metamask.io" target="_blank" rel="noreferrer">
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
              rel="noreferrer"
            >
              {wallet.accounts[0]}
            </a>
          </div>
          <p>Wallet Balance: {wallet.balance} ETH</p>
          {componentToRender}
        </>
      )}
    </div>
  );
};

export default Holder;
