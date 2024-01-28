import React, { useState } from "react";

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
      setResponse(JSON.stringify(data, null, 2));

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" value={id} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <pre>{isValid ? `age is valid` : `Invalid age`}</pre>
      </div>
    </div>
  );
};

export default Verifier;
