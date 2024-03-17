import "./App.css";
import Issuer from "../components/Issuer/Issuer.jsx";
import Verifier from "../components/Verifier/Verifier.jsx";
import Holder from "../components/Holder/Holder.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MetamaskContextProvider } from "./hooks/useMetamask.jsx";

function App() {
  return (
   <MetamaskContextProvider>
      <Router>
        <Routes>
          <Route exact path="issuer" element={<Issuer />} />
          <Route exact path="verifier" element={<Verifier />} />
          <Route exact path="holder" element={<Holder />} />
        </Routes>
      </Router>
      </MetamaskContextProvider>
  );
}

export default App;
