import React from "react";
import { useState, useEffect } from "react";
import StockListA from "../components/PortfolioStockListA";
import StockListB from "../components/PortfolioStockListB";
import PortfolioChart from "../components/PortfolioChart.jsx";
import PortfolioDropdown from "../components/PortfolioDropdown";
import { stocklistitem_data } from "../assets/stocklistitem_data";
import { v4 as uuidv4 } from "uuid";
import { mockPortfolioData } from "../assets/mockPortfolioData";
//import chartData from "../assets/lineGraphData";
//import { url } from "inspector";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function Portfolio() {
    const portfolioName = mockPortfolioData[0].overview[0].name_of_portfolio;
    const investedAmount = mockPortfolioData[0].overview[0].invested_amount;
    const availableAmount = mockPortfolioData[0].overview[0].available_amount;
    const companiesArray = [];


    let { id } = useParams();
  
    
    const Navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)

    const companyIds = mockPortfolioData[0].stocks.map(
        (stock) => stock.company_id
    );
    const cleanCompanyIds = companyIds.join();
    console.log(cleanCompanyIds);

    const [selectedInterval, setSelectedInterval] = useState("");
    const [stockItems, setStockItems] = useState();
    const [stockOverview, setStockOverview] = useState();
    const [stockCompaniesId, setStockCompaniesId] = useState();
    const [externalAPIstocks, setExternalAPIstocks] = useState();

    console.log(selectedInterval);

    /* const fetchMultipleCompanies = fetch(
    `https://api.twelvedata.com/time_series?symbol=${cleanCompanyIds}&interval=1day&format=JSON&dp=2&start_date=04/10/2023 5:44 PM&end_date=04/14/2023 5:44 PM&apikey=6a897c4468e74344b1546b36728e991b`
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .then((parsedData) => parsedData)
    .catch((error) => console.log(error.message)); */

    useEffect(() => {
        async function getPortfolioStocks() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/portfolio/1"
                );
                setStockItems(response.data.stocks);
                setStockOverview(response.data.overview[0]);
                console.log(response);
                console.log(response.data.stocks);
                return response.data.stocks;
            } catch (err) {
                console.log(err);
            }
        }
        async function someIdRetrieving() {
            try {
                const inputStuff = await getPortfolioStocks();
                const someId = inputStuff.map((stock) => stock.company_id);
                const cleanStockIds = someId.join();
                console.log(cleanStockIds);
                setStockCompaniesId(cleanStockIds);
                return cleanStockIds;
            } catch (err) {
                console.log(err);
            }
        }
        async function stockDataExternal() {
            try {
                const myStocksIds = await someIdRetrieving();
                const nextResponse = await axios.get(
                    `https://api.twelvedata.com/quote?symbol=${myStocksIds}&apikey=8cc6ed6b799b41028ff9e5664f0c0ebf`
                );
                console.log(nextResponse);
                setExternalAPIstocks(nextResponse.data);
            } catch (err) {
                console.log(err);
            }
        }
        stockDataExternal();
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
            <div className="portfolio_stocks container">
                <h3 className="text-center" style={{ padding: "2rem" }}>
                    Your Stocks
                </h3>

                {selectedInterval == "since buy" ? (
                    <div>
                        {stockItems &&
                            externalAPIstocks &&
                            stockItems.map((item) => {
                                return (
                                    <StockListB
                                        item={item}
                                        externalAPIstocks={externalAPIstocks}
                                    />
                                );
                            })}
                    </div>
                ) : (
                    <div>
                        {stockItems &&
                            externalAPIstocks &&
                            stockItems.map((item) => {
                                return (
                                    <StockListA
                                        item={item}
                                        externalAPIstocks={externalAPIstocks}
                                    />
                                );
                            })}
                    </div>
                )}

                {/* {stocklistitem_data &&
          stocklistitem_data.map((item) => {
            return (
              <StockListA
                url={item.url}
                symbol={item.meta.symbol}
                id={uuidv4()}
              />
            );
          })} */}
            </div>
            <div
                className="d-flex justify-content-center"
                style={{ padding: "2rem" }}
            >
                <button
                    type="button"
                    class="btn btn-primary"
                    style={{ marginRight: "0.5rem" }}
                >
                    Order book
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() =>
                        Navigate(`/transactions/${id}`, {
                            state: {externalAPIstocks},
                        })
                    }
                >
                    Buy/Sell
                </button>
            </div>
        </>
    );
}
