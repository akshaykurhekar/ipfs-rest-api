import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './ContractInteractionComponent.css';

const Issuer = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    passportId: "",
  });

  const [response, setResponse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objectId = `json${uuidv4().slice(-2)}`;
    const requestData = {
      objectId,
      data: {
        address: formData.address,
        credentials: {
          name: formData.name,
          passportId: formData.passportId,
          age: formData.age,
          address: formData.address,
        },
      },
    };

    try {
      const response = await fetch("http://localhost:8000/add-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponse("Error submitting form");
    }
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit} className="form">
      <label className="label">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Age:
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Id:
        <input
          type="text"
          name="passportId"
          value={formData.passportId}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
    <div className="response-container">
      <h2 className="response-heading">Credential Issued Success:</h2>
      <pre className="response"> 
        <div><label>DID</label>: did:passport:{response != null ? response.IpfsHash :null } </div>
        <div><label>Issue Timestamp</label>: {response != null ? response.Timestamp : null } </div>
      </pre>
    </div>
  </div>
  );
};

export default Issuer;
