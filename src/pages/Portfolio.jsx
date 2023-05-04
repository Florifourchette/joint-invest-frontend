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
import useAuth from "../hooks/useAuth";
import LogIn from "./LogIn";
import { Message } from "semantic-ui-react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "../components/Navbar";
import { BiArrowBack } from "react-icons/bi";
import PortfolioChartOverall from "../components/PortfolioChartOverall";

Chart.register(CategoryScale);

const portfolioAPIKey1 = import.meta.env.VITE_PORTFOLIO_API_KEY1;
const portfolioAPIKey2 = import.meta.env.VITE_PORTFOLIO_API_KEY2;

export default function Portfolio() {
  const { isAuthenticated } = useAuth();
  const portfolioName = mockPortfolioData[0].overview[0].name_of_portfolio;
  const investedAmount = mockPortfolioData[0].overview[0].invested_amount;
  const availableAmount = mockPortfolioData[0].overview[0].available_amount;
  const companiesArray = [];

  const { id } = useParams();

  const Navigate = useNavigate();
  const location = useLocation();
  console.log(` location at portfolio ${JSON.stringify(location.state)}`);
  const [sharePrice, setSharePrice] = useState(location.state.prices);
  const [shareNumber, setShareNumber] = useState(
    location.state.number_of_shares
  );
  const tickers = Object.keys(sharePrice).join();
  const tickersArray = Object.keys(sharePrice);

  console.log("SHARE PRICE", sharePrice);
  console.log("SHARE NUM", shareNumber);
  console.log(tickers);

  const companyIds = mockPortfolioData[0].stocks?.map(
    (stock) => stock.company_id
  );
  const cleanCompanyIds = companyIds.join();
  //console.log(cleanCompanyIds);

  const [selectedInterval, setSelectedInterval] = useState("");
  const [stockItems, setStockItems] = useState([]);
  const [stockOverview, setStockOverview] = useState();
  const [stockCompaniesId, setStockCompaniesId] = useState();
  const [externalAPIstocks, setExternalAPIstocks] = useState();
  const [allCompanies, setAllCompanies] = useState();
  const [stockData, setStockData] = useState();
  const [orderBook, setOrderBook] = useState();

  const handleBack = (e) => {
    e.preventDefault();
    Navigate(-1);
  };

  const datetimeValuesMap = {};

  console.log("all comps", allCompanies);

  if (allCompanies && Object.keys(allCompanies).length > 0) {
    for (const key in allCompanies) {
      const values = allCompanies[key].values;

      for (const value of values) {
        const datetime = value.datetime;

        if (datetime in datetimeValuesMap) {
          const properties = Object.keys(value);
          for (const property of properties) {
            if (property !== "datetime") {
              datetimeValuesMap[datetime][property] +=
                parseFloat(value[property]) * parseFloat(shareNumber[key]);
            }
          }
        } else {
          datetimeValuesMap[datetime] = { datetime };
          const properties = Object.keys(value);
          for (const property of properties) {
            if (property !== "datetime") {
              datetimeValuesMap[datetime][property] =
                parseFloat(value[property]) * parseFloat(shareNumber[key]);
            }
          }
        }
      }
    }
  }

  console.log(datetimeValuesMap);
  const intervalSum = Object.values(datetimeValuesMap);
  console.log("result", intervalSum);

  // Extract the summed value at the last timestamp
  const timestamps = Object.keys(datetimeValuesMap);
  const lastTimestamp = timestamps[timestamps.length - 1];
  const lastValues = datetimeValuesMap[lastTimestamp];
  console.log("Last timestamp:", lastTimestamp);
  console.log("Last values:", lastValues);

  //api calls

  useEffect(() => {
    async function getOrderBook() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order_book/${id}`
        );
        setOrderBook(response.data);
        console.log("orderbook api", response.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function getPortfolioStocks() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/portfolio/${id}`
        );
        setStockItems(response.data.stocks);
        setStockOverview(response.data.overview);
        //console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    async function stockDataExternal() {
      try {
        const nextResponse = await axios.get(
          `https://api.twelvedata.com/quote?symbol=${tickers}&apikey=${portfolioAPIKey2}`
        );
        //console.log(myStocksIds);
        console.log(nextResponse);
        if (nextResponse.data?.status !== "error") {
          setExternalAPIstocks(nextResponse.data);
        } else {
          console.log(nextResponse.data.status);
        }
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchMultipleCompanies() {
      try {
        //console.log(myStocksIds);
        const data = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${tickers}&interval=1h&outputsize=8&format=JSON&dp=2&apikey=${portfolioAPIKey2}`
        );
        console.log(data);
        if (data.data?.status !== "error") {
          setAllCompanies(data.data);
        } else {
          console.log(data.data.status);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    async function fetchStocks() {
      try {
        const stockInfos = await axios.get("http://localhost:3000/api/stocks");
        setStockData(stockInfos.data);
        console.log(stockInfos.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getOrderBook();
    getPortfolioStocks();
    stockDataExternal();
    fetchMultipleCompanies();
    fetchStocks();
  }, [id]);

  // return isAuthenticated ? (
  return (
    <>
      <div className="portfolio_overview">
        {lastValues && (
          <>
            <h3>Total Assets at {lastValues.datetime}</h3>
            <h1>$ {lastValues.close}</h1>
          </>
        )}
        {/* <h4>Amount invested</h4>
        <h4>{investedAmount}</h4>

        <p>Total loss</p>
        <p>-12,01</p> */}
      </div>
      <div className="portfolio_available_amount">
        <h4>Available amount</h4>
      </div>
      <div className="PortfolioDropdown">
        <PortfolioDropdown
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
        />
      </div>
      <div className="portfolio_stocks container">
        {selectedInterval == "Overall" ? (
          <div>
            <div className="portfolio_lineGraph">
              <PortfolioChartOverall orderBook={orderBook} />
            </div>
            {stockItems &&
              sharePrice &&
              stockData &&
              externalAPIstocks &&
              stockItems?.map((item) => {
                return (
                  <StockListB
                    item={item}
                    externalAPIstocks={externalAPIstocks}
                    sharePrice={sharePrice}
                    stockData={stockData}
                  />
                );
              })}
          </div>
        ) : (
          <div>
            <div className="portfolio_lineGraph">
              <PortfolioChart intervalSum={intervalSum} />
            </div>
            {stockItems &&
              stockData &&
              sharePrice &&
              externalAPIstocks &&
              stockItems?.map((item) => {
                return (
                  <StockListA
                    item={item}
                    externalAPIstocks={externalAPIstocks}
                    sharePrice={sharePrice}
                    stockData={stockData}
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
          onClick={() =>
            Navigate(`/orderbook/${id}`, {
              state: location.state,
            })
          }
        >
          Order book
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            Navigate(`/transactions/${id}`, {
              state: location.state,
            })
          }
        >
          Buy/Sell
        </button>
      </div>
      {/* <Navbar /> */}
    </>
  );
  //   ) : (
  //     <div>
  //       <div className="d-flex justify-content-center">
  //         <Message style={{ color: "red" }}>
  //           You are not logged in, please login!
  //         </Message>
  //       </div>
  //       <LogIn />
  //     </div>
  //   );
}
