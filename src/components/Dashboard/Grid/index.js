import "./styles.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Brightness5RoundedIcon from "@mui/icons-material/Brightness5Rounded";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";
import { Link } from "react-router-dom";
import { AddToWatchList } from "../../../functions/AddToWatchList";
import isCoinInWatchlist from "../../../functions/isCoinInWatchlist";
import { useState } from "react";
export default function Grid({ coin }) {
  const [reRender, setReRender] = useState(false);
  let priceChipCssClass = "price-chip";
  let iconChipCssClass = "icon-chip grid-icon";

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
  const handleWatchlistButtonClick = (event, coinId) => {
    event.preventDefault();
    event.stopPropagation();
    AddToWatchList(coinId);
    setReRender((preValue) => !preValue);
  };
  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 && "gird-container-red"
        }`}
      >
        <div className="flex">
          <div className="info-flex">
            <img
              src={coin.image}
              alt={`${coin.name} Logo`}
              className="coin-logo"
            />
            <div className="name-col">
              <p className="coin-symbol">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
          </div>
          {coin && (
            <button
              className="watchlist-btn"
              onClick={(event) => {
                handleWatchlistButtonClick(event, coin.id);
              }}
            >
              {" "}
              {watchLogo}
            </button>
          )}
        </div>
        <div className="chip-flex">
          <div className={priceChipCssClass}>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className={iconChipCssClass}>{trendingIcon}</div>
        </div>
        <div className="info-container">
          <h3
            className="coin-price"
            style={{
              color:
                coin.price_change_percentage_24h > 0
                  ? "var(--green)"
                  : "var(--red)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="total-info-text">
            Total Volume: {coin.total_volume.toLocaleString()}
          </p>
          <p className="total-info-text">
            Market Cap: {coin.market_cap.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
