import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import "../styles/App.css";
import { Link, Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
    <Routes>
      <Route path="/:userId" element={<Dashboard />} />
      <Route path="/portfolio/:id" element={<Portfolio />} />
    </Routes>

    </>
  );
}

export default App;
