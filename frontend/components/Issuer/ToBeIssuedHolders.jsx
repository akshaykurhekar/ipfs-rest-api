import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import axios from "axios";
import { ethers } from "ethers";
import ModalDialog from "./ModalDialog";
import Form from "./Form";

const baseUrl = "http://localhost:8000/";

const columns = [
  { id: "walletAddress", label: "Wallet Address", minWidth: 100 },

  {
    id: "isIssued",
    label: "Issue Action",
    align: "right",
    minWidth: 170,
  },
];

export default function ToBeIssuedHolders({
  unissuedHolders,
  setUnissuedHolders,
  handleIssue,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = (row) => {
    setOpen(true);
    console.log(row);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "500rem",
        bgcolor: "background.paper",
      }}
    >
      {unissuedHolders.map((value) => (
        <ListItem
          key={value}
          sx={{ paddingRight: 5, marginRight: 5 }}
          secondaryAction={
            <>
              <Button onClick={handleOpen}>Issue</Button>
              <ModalDialog
                open={open}
                handleClose={handleClose}
                walletAddress={value}
                handleIssue={handleIssue}
              ></ModalDialog>
            </>
          }
        >
          <ListItemText primary={`${value}`} sx={{ color: "black" }} />
        </ListItem>
      ))}
    </List>
  );
}
