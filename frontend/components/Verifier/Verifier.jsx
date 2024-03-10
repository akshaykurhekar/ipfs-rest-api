import { useState } from "react";
import "../../src/styles/Verifier.module.css"; // Import your CSS file

const Verifier = () => {
  const [id, setId] = useState("");
  const [response, setResponse] = useState("");
  const [isValid, setIsValid] = useState(Boolean);

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      cid: id,
    };

    try {
      const response = await fetch("http://localhost:8000/read-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setResponse(data);
      console.log(response);

      if (parseInt(data.credentials.age) > 18) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error fetching data");
    }
  };

  return (
    <>
      <div>
        <h1>Verifier Webpage </h1>
      </div>
      <div className="verifier-container">
        {" "}
        {/* Add a class for the main container */}
        <form onSubmit={handleSubmit}>
          <label style={{ color: "black" }}>Enter user DID</label>
          <input type="text" value={id} onChange={handleChange} required />

          <br />
          <button type="submit">Submit</button>
        </form>
        <div className="response-container">
          {" "}
          {/* Add a class for the response container */}
          <h2>User status:</h2>
          <pre>{isValid ? `Yes, this user is 18+` : `User is under 18!!`}</pre>
        </div>
      </div>
    </>
  );
};

export default Verifier;
