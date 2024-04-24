import "./App.css";
import React, { useEffect, useState } from "react";
import { ModeContextProvider } from "./Store/modeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/ComparePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WatchlistPage from "./pages/WatchlistPage";
function App() {
  return (
    <ModeContextProvider>
      <ToastContainer />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage/>
              }
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/coin/:id" element={<CoinPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route />
          </Routes>
        </BrowserRouter>
      </div>
    </ModeContextProvider>
  );
}

export default App;
