import "./App.css";
import React, { useEffect, useState } from "react";
import { ModeContextProvider } from "./Store/modeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/ComparePage";
function App() {
  // const [darkMode, setDarkMode] = useState(false);
  // const handletoggleDarkMode = () => {
  //   setDarkMode((prevMode) => !prevMode);
  //   console.log("btoondarkcick");
  // };
  // useEffect(() => {
  //   const root = document.documentElement;
  //   if (darkMode) {
  //     root.style.setProperty("--white", "#111");
  //     root.style.setProperty("--black", "#f2efef");
  //     root.style.setProperty("--grey", "#1b1b1b");
  //     root.style.setProperty("--darkgrey", "#DDDCDD");
  //   } else {
  //     root.style.setProperty("--white", "#f2efef");
  //     root.style.setProperty("--black", "#111");
  //     root.style.setProperty("--grey", "#888");
  //     root.style.setProperty("--darkgrey", "#1b1b1b");
  //   }
  // }, [darkMode]);
  return (
    <ModeContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  // darkMode={darkMode}
                  // ontoggleDarkMode={handletoggleDarkMode}
                />
              }
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/coin/:id" element={<CoinPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route />
          </Routes>
        </BrowserRouter>
      </div>
    </ModeContextProvider>
  );
}

export default App;
