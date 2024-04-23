import React, { useState } from "react";
import './styles.css'
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function PriceTypeToggle({priceToggle,handlePriceTypeChange}) {


  return (
    <div className="toggle-price">
    <ToggleButtonGroup
      value={priceToggle}
      exclusive
      onChange={handlePriceTypeChange}
      sx={{
        '&.Mui-selected':{
          color: 'var(--blue) !important',
        },
        borderColor: 'var(--blue)',
        border: 'unset !important',
        '& .MuiToggleButtonGroup-grouped':{
          border: '1px solid !important',
          borderColor: 'unset',
          color: 'var(--blue)',
        },
        '& .MuiToggleButton-standard.Mui-selected': {
          borderColor: 'var(--blue) !important', 
          color: 'var(--blue) !important',
        },
        '& .MuiToggleButton-standard':{
          color: 'var(--blue)',
        },
      }}
    >
      <ToggleButton value="prices" className="toggle-btn">Prices</ToggleButton>
      <ToggleButton value="market_caps"  className="toggle-btn">Market Caps</ToggleButton>
      <ToggleButton value="total_volumes"  className="toggle-btn">Total Volumes</ToggleButton>
    </ToggleButtonGroup>
    </div>
  );
}
