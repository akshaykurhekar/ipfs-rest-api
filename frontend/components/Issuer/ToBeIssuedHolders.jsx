import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Form from "./Form";
import { Dialog } from "@mui/material";

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
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const handleIssue = async () => {};
  const handleOpen = async (value) => {
    setCurrent(value);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeHolder = (value) => {
    setCurrent(value);
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "500rem",
        bgcolor: "background.paper",
      }}
    >
      {unissuedHolders.map((value) => {
        return (
          <ListItem key={value} sx={{ paddingRight: 5, marginRight: 5 }}>
            <ListItemText primary={`${value}`} sx={{ color: "black" }} />
            <Button onClick={() => handleOpen(value)}>issue</Button>
            <Dialog open={open} onClose={handleClose}>
              <Form
                handleClose={handleClose}
                handleIssue={handleIssue}
                walletAddress={current}
              ></Form>
            </Dialog>
          </ListItem>
        );
      })}
    </List>
  );
}
