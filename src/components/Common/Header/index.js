import { Link } from "react-router-dom";
import Button from "../Button/Index";
import AnchorTemporaryDrawer from "./drawer";
import modeContext from "../../../Store/modeContext";
import "./styles.css";
import { useContext } from "react";
import SwitchMode from "./SwitchMode";
export default function Header() {
  const modeCtx = useContext(modeContext) 
  return (
    <div className="navbar">
      <h1 className="logo">
      CryptoTracker <span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className="links">
        <SwitchMode />
        <Link to="/">
          <p className="link">Home</p>
        </Link>
        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className="link">Watchlist</p>
        </Link>
        <Link to="/dashboard">
        <Button onClick={()=>undefined}>Dashboard</Button>
        </Link>
      </div>
      <div className="mobile-drawer">
        <AnchorTemporaryDrawer />
      </div>
    </div>
  );
}
