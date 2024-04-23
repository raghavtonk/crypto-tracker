import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { TabList, TabPanel } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material";
import Grid from "../Grid";
import List from '../List'
import './styles.css'
export default function TabsComponent({ coinsData }) {
  const [value, setValue] = useState("grid");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const styleClass = {
    color: "var(--white)",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Grid" value="grid" sx={styleClass} />
            <Tab label="List" value="list" sx={styleClass} />
          </TabList>
        </div>
        <TabPanel value="grid">
          <div className="grids-container" >
          {coinsData?.map((coin, index) => {
            return (
                <Grid coin={coin} key={coin.id}/>
                );
              })}
              </div>
        </TabPanel>
        <TabPanel value="list">
        <table className="table-list">
          {(coinsData != [] && coinsData !== undefined) && coinsData.map((coin, index) => {
            return (
            <List key={coin.id}  coin={coin}/>
            );
          })}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
