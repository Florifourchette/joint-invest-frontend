import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import "../styles/App.css";
import { Link, Routes, Route } from "react-router-dom";
import CreationPortfolio from "./pages/CreationPortfolio";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/Signup";
import Transactions from "./pages/Transactions";
import Orderbook from "./pages/Orderbook";
import AuthStateContext from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthStateContext>
        <Routes>
          <Route path="/home" />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/overview/:userId" element={<Dashboard />} />
          <Route path="/transactions/:portfolioId" element={<Transactions />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
          <Route
            path="/create_portfolio/:userId"
            element={<CreationPortfolio />}
          />
          <Route path="/order_book/:portfolio_id" element={<Orderbook />} />
        </Routes>
      </AuthStateContext>
    </>
  );
}

export default App;
