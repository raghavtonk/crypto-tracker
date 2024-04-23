import { useState } from "react";
import "./styles.css";
export default function CoinInfo({ heading, desc }) {
  const [flag, setFlag] = useState(false);
  const shortDesc = desc &&
    desc.slice(0, 250) +
    "<p style='color: var(--grey)'> Read More... </p>";
  const longDesc =
    desc + "<p style='color: var(--grey)'> Read Less... </p>";
  return (
    <div className="grey-wrapper">
      <h3 className="coin-info-heading">{heading}</h3>
      {desc && desc.length > 250 ?(
        <p
        onClick={() => setFlag(!flag)}
        className="coin-info-desc"
        dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
      />
      ):(<p dangerouslySetInnerHTML={{ __html: desc }}/>)}
      
    </div>
  );
}
