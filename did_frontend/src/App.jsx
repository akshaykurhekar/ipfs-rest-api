import "./App.css";
import Issuer from "../components/Issuer";
import Verifier from "../components/Verifier";
import Holder from "../components/Holder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="issuer" element={<Issuer />} />
        <Route exact path="verifier" element={<Verifier />} />
        <Route exact path="holder" element={<Holder />} />
      </Routes>
    </Router>
  );
}

export default App;
