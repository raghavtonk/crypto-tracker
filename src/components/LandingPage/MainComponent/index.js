import Button from "../../Common/Button/Index";
import "./styles.css";
import { motion } from "framer-motion";
import phone from "../../../assets/phone.png";
import gradient from "../../../assets/gradient.png";
export default function MainComponent() {
  return (
    <div className="flex-info">
      <div className="left-component">
        <motion.h1
          className="tract-crypto-heading"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay:0.3 }}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          className="real-time-heading"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay:0.5 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          className="info-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay:1}}
        >
          Track crypto through a public api in real time. Visit the dashboard to
          do so!
        </motion.p>
        <motion.div
          className="flex-btn"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay:1.5 }}
        >
          <Button>Dashboard</Button>
          <Button outlined>Share</Button>
        </motion.div>
      </div>

      <div className="right-phone-component">
        <motion.img
          src={phone}
          alt="Landing Page Phone"
          className="phone-img"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{ 
            duration: 2,
            type: 'smooth',
            repeatType: 'mirror',
            repeat: Infinity
        }}
        />
        <img
          src={gradient}
          alt="Landing Page Gradient"
          className="gradient-img"
        />
      </div>
    </div>
  );
}
