import { useState, useEffect } from "react";
import "../../src/styles/Verifier.module.css"; // Import your CSS file
import { Button, styled, TextField } from "@mui/material";
import axios from "axios";
const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: "1rem",
  width: "300px",
}));

const Verifier = () => {
  const [did, setDid] = useState("");
  const [isValid, setIsValid] = useState(Boolean);
  const [display, setDisplay] = useState(false);
  const handleChange = (e) => {
    setDid(e.target.value);
  };
  useEffect(() => {
    document.title = "Verifier";
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8000/verify", {
      did: did,
    });
    if (
      response.data.output == '"0x0000000000000001"' &&
      response.data.isVerified
    ) {
      setIsValid(true);
      setDisplay(true);
    } else {
      setIsValid(false);
      setDisplay(true);
    }
  };

  return (
    <>
      <title> Verifier </title>
      <div>
        <h1>Verifier Webpage </h1>
      </div>
      <div className="verifier-container">
        {" "}
        {/* Add a class for the main container */}
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: "white", borderRadius: "10px" }}
        >
          <StyledTextField
            label="DID"
            name="DId"
            variant="filled"
            required
            value={did}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ margin: "2rem" }}
          >
            Validate DID
          </Button>
        </form>
        {display && (
          <div className="response-container">
            {" "}
            {/* Add a class for the response container */}
            <h2>User status:</h2>
            <pre>
              {isValid ? `Yes, this user is 18+` : `User is under 18!!`}
            </pre>
          </div>
        )}
      </div>
    </>
  );
};

export default Verifier;
