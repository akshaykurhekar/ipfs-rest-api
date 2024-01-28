import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Issuer = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    passportId: "",
  });
  const [response, setResponse] = useState("");

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
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponse("Error submitting form");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Id:
          <input
            type="text"
            name="passportId"
            value={formData.passportId}
            onChange={handleChange}
          />{" "}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default Issuer;
