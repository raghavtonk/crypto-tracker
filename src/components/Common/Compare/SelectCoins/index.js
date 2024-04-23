import "./styles.css";
import React, { useEffect} from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import get100CoinsData from "../../../../functions/getAllCoins";

export default function SelectCoins({ allCoinsData,onAllCoinDataChange,crypto1,crypto2,handleCoinChange}) {
  console.log('compare selectcoins rander')

  const cssStyle = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

  useEffect(()=>{
    async function getData(){
      const myCoins = await get100CoinsData();
      if(myCoins.message === 'success'){
        onAllCoinDataChange(myCoins.data);
      }
    };
    getData();
  },[onAllCoinDataChange]);

  return (
    <>
    {allCoinsData!= [] && crypto1 && crypto2 && <div className="coins-flex">
        <p>crypto 1</p>
      <Select
        sx={cssStyle}
        value={crypto1}
        label="Crypto 1"
        onChange={(event)=>handleCoinChange(event,'crypto1')}
      >
        {allCoinsData != [] &&
          allCoinsData != undefined &&
          allCoinsData.filter((item)=>item.id !== crypto2).map((coin) => (
            <MenuItem key={coin.name} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>
      <p>crypto 2</p>
      <Select
        sx={cssStyle}
        value={crypto2}
        label="Crypto 2"
        onChange={handleCoinChange}
      >
        {allCoinsData != [] &&
          allCoinsData != undefined &&
          allCoinsData.filter((item)=>item.id !== crypto1).map((coin) => (
            <MenuItem key={coin.name} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>
    </div>}
    </>
  );
}
