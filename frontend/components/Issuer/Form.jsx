import { Button, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: "1rem",
  width: "300px",
}));

const Form = (props) => {
  const passport = uuidv4();
  const initialForm = {
    name: null,
    age: null,
  };
  const [formData, setFormData] = useState(initialForm);
  const baseUrl = "http://localhost:8000/";
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // try {
    //   console.log(formData);
    //   axios
    //     .patch(`${baseUrl}holdercollection/${walletAddress}`, formData)
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } catch (error) {
    //   console.log("error while registering holder", error);
    // }
    props.handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h3>Enter Holder Details</h3>
      <h4>{`for ${props.walletAddress}`}</h4>
      <StyledTextField
        label="Name"
        name="name"
        variant="filled"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <StyledTextField
        label="Age"
        name="age"
        type="number"
        variant="filled"
        required
        value={formData.age}
        onChange={handleChange}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={props.handleIssue}
          sx={{ margin: "2rem" }}
        >
          Issue
        </Button>
      </div>
    </form>
  );
};

export default Form;
