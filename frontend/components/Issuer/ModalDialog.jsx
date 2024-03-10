import { Dialog } from "@mui/material";
import Form from "./Form.jsx";

const ModalDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Form
        handleClose={props.handleClose}
        walletAddress={props.walletAddress}
        handleIssue={props.handleIssue}
      />
    </Dialog>
  );
};

export default ModalDialog;
