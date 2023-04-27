import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import "../styles/App.css";
import { Link, Routes, Route } from "react-router-dom";
import CreationPortfolio from "./pages/CreationPortfolio";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/Signup";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/:userId" element={<Dashboard />} />
        <Route path="transactions/:portfolioId" element={<Transactions />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
        <Route
          path="/create_portfolio/:userId"
          element={<CreationPortfolio />}
        />
      </Routes>
    </>
  );
}

export default App;
