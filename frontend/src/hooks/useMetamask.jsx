import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const disconnectedState = {
  accounts: [],
  balance: null,
};

const MetamaskContext = createContext({});

export const MetamaskContextProvider = ({ children }) => {
  const [hasProvider, setHasProvider] = useState(null);
  const [isConnecting, setisConnecting] = useState(null);
  const [wallet, setWallet] = useState(disconnectedState);
  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
    return balance;
  };

  const _updateWallet = useCallback(async (providedAccounts) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: "eth_accounts" }));
    if (accounts.length === 0) {
      setWallet(disconnectedState);
      return;
    }
    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    setWallet({ accounts, balance });
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  );
  const updateWallet = useCallback(
    (accounts) => _updateWallet(accounts),
    [_updateWallet]
  );

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        window.ethereum.on("accountsChanged", updateWallet);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
    };
  }, [updateWallet]);

  const connectMetamask = async () => {
    setisConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err) {
      console.log(err);
    }
    setisConnecting(false);
  };

  return (
    <MetamaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetamask,
        clearError,
        provider,
        signer,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetamaskContext);
  if (context === undefined) {
    throw new Error(
      "useMetaMask must be used within a MetamaskContextProvider"
    );
  }
  return context;
};
