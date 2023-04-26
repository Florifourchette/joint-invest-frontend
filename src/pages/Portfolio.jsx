import React from "react";
import { useState, useEffect } from "react";
import StockListItem from "../components/PortfolioStockListItem";
import PortfolioChart from "../components/PortfolioChart.jsx";
import PortfolioDropdown from "../components/PortfolioDropdown";
import { stocklistitem_data } from "../assets/stocklistitem_data";
import { v4 as uuidv4 } from "uuid";
import { mockPortfolioData } from "../assets/mockPortfolioData";
//import chartData from "../assets/lineGraphData";
//import { url } from "inspector";
import axios from "axios";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function Portfolio() {
  const portfolioName = mockPortfolioData[0].overview[0].name_of_portfolio;
  const investedAmount = mockPortfolioData[0].overview[0].invested_amount;
  const availableAmount = mockPortfolioData[0].overview[0].available_amount;

  const companyIds = mockPortfolioData[0].stocks.map(
    (stock) => stock.company_id
  );
  const cleanCompanyIds = companyIds.join();

  const [selectedInterval, setSelectedInterval] = useState("");

  useEffect(() => {
    const fetchMultipleCompanies = fetch(
      `https://api.twelvedata.com/time_series?symbol=${cleanCompanyIds}&interval=1h&outputsize=8&format=JSON&dp=2&apikey=be132a840da8483d8b3386724d5bcb2f`
    )
      .then((response) => response.json())
      .then((parsedData) => setAllCompanies(parsedData))
      .catch((error) => console.log(error.message));
  }, []);

  const [allCompanies, setAllCompanies] = useState("");

  const stockValues = Object.values(allCompanies).map(
    (company) => company.values
  );

  console.log(stockValues);

  useEffect(() => {
    async function getPortfolioStocks() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/portfolio/1"
        );
        console.log(response);
        setStockItems(response.data.stocks);
        setStockOverview(response.data.overview[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getPortfolioStocks();
  }, []);

  return (
    <>
      <div className="portfolio_overview">
        <h1>{portfolioName}</h1>
        <h3>Total Assets</h3>
        <h1>153,60</h1>
        <h4>Amount invested</h4>
        <h4>{investedAmount}</h4>

        <p>Total loss</p>
        <p>-12,01</p>
      </div>
      <div className="portfolio_lineGraph">
        <PortfolioChart />
      </div>
      <div className="portfolio_available_amount">
        <h4>Available amount</h4>
        <h4>{availableAmount}€</h4>
      </div>
      <div className="PortfolioDropdown">
        <PortfolioDropdown
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
        />
      </div>
      <div className="portfolio_stocks">
        <h3>Your Stocks</h3>
        {stocklistitem_data &&
          stocklistitem_data.map((item) => {
            return (
              <StockListItem
                url={item.url}
                symbol={item.meta.symbol}
                id={uuidv4()}
              />
            );
          })}
      </div>
      <div className="buttons">
        <button>Order book</button>
        <button>Buy/Sell</button>
      </div>
    </>
  );
}
