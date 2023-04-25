import react, { useState } from "react";
import Dashboard from "./pages/dashboard";
import Portfolio from "./pages/Portfolio";
import "../styles/App.css";

function App() {
  return (
    <>
      <Dashboard />
      <Portfolio />
    </>
  );
}

export default App;
