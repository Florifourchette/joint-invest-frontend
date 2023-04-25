import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>Overview</h1>
      <div className="assets">
        <h3>Total Assets</h3>
        <h2>1.1345.77</h2>
        <h5>Amount Invested</h5>
        <h4>1.000,00</h4>
        <h5>Total gains</h5>
        <h4>+135.22</h4>
      </div>
      <div className="graph">
        <h3>Graph goes here</h3>
      </div>
      <div className="portfolio-cards">
        <div>Porfolio cards go here</div>
        <div>Porfolio cards go here</div>
        <div>Porfolio cards go here</div>
        <div>Porfolio cards go here</div>
      </div>
      <div className="portfolio-add">
        <p>Add a portfolio</p>
        <button>+</button>
      </div>
    </div>
  );
}
