import "./styles.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Link } from "react-router-dom";
export default function Grid({ coin }) {
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
  return (
    <Link to={`/coin/${coin.id}`} >
    <div className={`grid-container ${coin.price_change_percentage_24h < 0 && 'gird-container-red'}`}>
      <div className="info-flex">
        <img src={coin.image} alt={`${coin.name} Logo`} className="coin-logo" />
        <div className="name-col">
          <p className="coin-symbol">{coin.symbol}</p>
          <p className="coin-name">{coin.name}</p>
        </div>
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
        <p className="total-info-text">Total Volume: {coin.total_volume.toLocaleString()}</p>
        <p className="total-info-text">Market Cap: {coin.market_cap.toLocaleString()}</p>
      </div>
    </div>
    </Link>
  );
}
