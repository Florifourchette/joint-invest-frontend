import React from "react";
import { useNavigate } from "react-router-dom";

export default function Instructions() {
  const navigate = useNavigate();

  const reDirect = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div style={{ width: "100%", background: "#FFD600" }} onClick={reDirect}>
      <div className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <img
          src="public/website_assets/instructions.png"
          alt="company_logo"
          style={{ maxWidth: "500px" }}
        />
      </div>
    </div>
  );
}
