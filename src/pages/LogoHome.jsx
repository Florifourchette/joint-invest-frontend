import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoHome() {
  const navigate = useNavigate();

  const reDirect = (e) => {
    e.preventDefault();
    navigate("/instructions");
  };

  return (
    <div style={{ width: "100%", background: "#FFD600" }} onClick={reDirect}>
      <div className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <img
          src="/beehive.png"
          alt="company_logo"
          style={{ minWidth: "390px" }}
        />
      </div>
    </div>
  );
}
