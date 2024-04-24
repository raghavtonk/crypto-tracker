import "./styles.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Tooltip } from "@mui/material";
import { convertNumbers } from "../../../functions/convertNumbers";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AddToWatchList } from "../../../functions/AddToWatchList";
import isCoinInWatchlist from "../../../functions/isCoinInWatchlist";
import Brightness5RoundedIcon from "@mui/icons-material/Brightness5Rounded";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";
export default function List({ coin }) {
  const [reRender, setReRender] = useState(false);
  let priceChipCssClass = "price-chip";
  let iconChipCssClass = "icon-chip td-icon";

  coin.price_change_percentage_24h > 0
    ? (priceChipCssClass += " green-chip")
    : (priceChipCssClass += " red-chip");

  coin.price_change_percentage_24h > 0
    ? (iconChipCssClass += " green-chip")
    : (iconChipCssClass += " red-chip");

  const trendingIcon =
    coin.price_change_percentage_24h > 0 ? (
      <TrendingUpIcon />
    ) : (
      <TrendingDownIcon />
    );
    const isInWatchlist = isCoinInWatchlist(coin.id);
  let watchLogo = isInWatchlist ? (
    <Brightness7RoundedIcon
      fontSize="large"
      style={{
        color:
          coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)",
      }}
    />
  ) : (
    <Brightness5RoundedIcon
      fontSize="large"
      style={{
        color:
          coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)",
      }}
    />
  );
  let watchLogo2 = isInWatchlist ? (
    <Brightness7RoundedIcon
      fontSize="small"
      style={{
        color:
          coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)",
      }}
    />
  ) : (
    <Brightness5RoundedIcon
      fontSize="small"
      style={{
        color:
          coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)",
      }}
    />
  );
    const handleWatchlistButtonClick = (event, coinId) => {
      event.preventDefault();
      event.stopPropagation();
      AddToWatchList(coinId);
      setReRender((preValue) => !preValue);
    };
  return (
    <Link to={`/coin/${coin.id}`}>
      <tr className="list-row">
        <Tooltip title="Coin Logo" placement="bottom-start">
          <td className="td-image">
            <img
              src={coin.image}
              alt={`${coin.name} Logo`}
              className="coin-logo"
            />
          </td>
        </Tooltip>
        <td>
          <div className="name-col" placement="bottom-start">
            <Tooltip title="Symbol">
              <p className="coin-symbol">{coin.symbol}</p>
            </Tooltip>
            <Tooltip title="Name" placement="bottom-start">
              <p className="coin-name">{coin.name}</p>
            </Tooltip>
          </div>
        </td>
        <Tooltip title="Price Change" placement="bottom-start">
          <td className="chip-flex">
            <div className={priceChipCssClass}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </div>
            <div className={iconChipCssClass}>{trendingIcon}</div>
          </td>
        </Tooltip>
        <Tooltip title="Current Price" placement="bottom-start">
          <td>
            <h3
              className="coin-price td-center-align"
              style={{
                color:
                  coin.price_change_percentage_24h > 0
                    ? "var(--green)"
                    : "var(--red)",
              }}
            >
              ${coin.current_price?.toLocaleString()}
            </h3>
          </td>
        </Tooltip>

        <Tooltip title="Total Volume" placement="bottom-start">
          <td>
            <p className="total-info-text td-right-align td-volume">
              {coin.total_volume?.toFixed(2)}
            </p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-start">
          <td className="desktop-td-mkt">
            <p className="total-info-text td-right-align">
              {" "}
              {coin.market_cap?.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-start">
          <td className="mobile-td-mkt">
            {coin && coin.market_cap && (
              <p className="total-info-text td-right-align">
                {" "}
                {convertNumbers(coin.market_cap)}
              </p>
            )}
          </td>
        </Tooltip>
        <Tooltip title="Add To Watch List" placement="bottom-start">
          <td className="desktop-td-wlb">
            {coin && (
              <button
              className="watchlist-btn td-right-align"
              onClick={(event) => {
                handleWatchlistButtonClick(event, coin.id);
              }}
            >
              {" "}
              {watchLogo}
            </button>
            )}
          </td>
        </Tooltip>
        <Tooltip title="Add To Watch List" placement="bottom-start">
          <td className="mobile-td-wlb">
          {coin && (
              <button
              className="watchlist-btn td-right-align"
              onClick={(event) => {
                handleWatchlistButtonClick(event, coin.id);
              }}
            >
              {" "}
              {watchLogo2}
            </button>
            )}
          </td>
        </Tooltip>
      </tr>
    </Link>
  );
}

