import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import IssuedHolders from "./IssuedHolders";
import ToBeIssuedHolders from "./ToBeIssuedHolders";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({
  issuedHolders,
  setIssuedHolders,
  unissuedHolders,
  setUnissuedHolders,
  handleIssue,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Issued Holders" {...a11yProps(0)} />
        <Tab label="Holders To be Issued" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <IssuedHolders
          issuedHolders={issuedHolders}
          setIssuedHolders={setIssuedHolders}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ToBeIssuedHolders
          unissuedHolders={unissuedHolders}
          setUnissuedHolders={setUnissuedHolders}
          handleIssue={handleIssue}
        />
      </TabPanel>
    </Box>
  );
}
