import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import "../styles/App.css";
import { Link, Routes, Route } from "react-router-dom";
import CreationPortfolio from "./pages/CreationPortfolio";
import Transactions from "./pages/Transactions";



function App() {

  return (
    <>
    <Routes>
      <Route path="/:userId" element={<Dashboard />} />
      <Route path="/portfolio/:id" element={<Portfolio />} />
      <Route path="transactions/:portfolioId" element={<Transactions />} />
      <Route path="/create_portfolio/:userId" element={<CreationPortfolio />} />
    </Routes>

    </>
  );
}

export default App;
