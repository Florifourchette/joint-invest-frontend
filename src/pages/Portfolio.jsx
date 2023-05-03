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

Chart.register(CategoryScale);


const portfolioAPIKey1 = import.meta.env.VITE_PORTFOLIO_API_KEY1
const portfolioAPIKey2 = import.meta.env.VITE_PORTFOLIO_API_KEY2

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

  console.log(sharePrice);
  console.log(shareNumber);
  console.log(tickers);

  const companyIds = mockPortfolioData[0].stocks?.map(
    (stock) => stock.company_id
  );
  const cleanCompanyIds = companyIds.join();
  //console.log(cleanCompanyIds);

  const [selectedInterval, setSelectedInterval] = useState("");
  const [stockItems, setStockItems] = useState([]);
  const [stockOverview, setStockOverview] = useState("");
  const [stockCompaniesId, setStockCompaniesId] = useState();
  const [externalAPIstocks, setExternalAPIstocks] = useState();
  // const [allCompanies, setAllCompanies] = useState();
  const [stockData, getStockData] = useState();


  const allCompanies = {
    AAPL: {
      meta: {
        symbol: 'AAPL',
        interval: '1h',
        currency: 'USD',
        exchange_timezone: 'America/New_York',
        exchange: 'NASDAQ',
      },
      status: 'ok',
      values: [
        {
          datetime: '2023-05-02 15:30:00',
          open: '168.97',
          high: '168.98',
          low: '168.39',
          close: '168.55',
        },
        {
          datetime: '2023-05-02 14:30:00',
          open: '168.47',
          high: '169.28',
          low: '168.46',
          close: '168.96',
        },
        {
          datetime: '2023-05-02 13:30:00',
          open: '168.80',
          high: '168.95',
          low: '168.35',
          close: '168.47',
        },
        {
          datetime: '2023-05-02 12:30:00',
          open: '168.11',
          high: '168.93',
          low: '168.09',
          close: '168.81',
        },
        {
          datetime: '2023-05-02 11:30:00',
          open: '167.82',
          high: '168.23',
          low: '167.54',
          close: '168.11',
        },
        {
          datetime: '2023-05-02 10:30:00',
          open: '168.67',
          high: '168.73',
          low: '167.70',
          close: '167.82',
        },
        {
          datetime: '2023-05-02 09:30:00',
          open: '170.09',
          high: '170.35',
          low: '168.49',
          close: '168.71',
        },
        {
          datetime: '2023-05-01 15:30:00',
          open: '169.70',
          high: '169.90',
          low: '169.25',
          close: '169.56',
        },
      ],
    },}

  const datetimeValuesMap = {};

  console.log('all comps',allCompanies);
  for (const key in allCompanies) {
    const values = allCompanies[key].values;
  
    for (const value of values) {
      const datetime = value.datetime;
  
      if (datetime in datetimeValuesMap) {
        const properties = Object.keys(value);
        for (const property of properties) {
          if (property !== 'datetime') {
            datetimeValuesMap[datetime][property] += parseFloat(value[property]);
          }
        }
      } else {
        datetimeValuesMap[datetime] = { datetime };
        const properties = Object.keys(value);
        for (const property of properties) {
          if (property !== 'datetime') {
            datetimeValuesMap[datetime][property] = parseFloat(value[property]);
          }
        }
      }
    }
  }
  
  const intervalSum = Object.values(datetimeValuesMap);
  console.log('result',intervalSum);


  //api calls

  // useEffect(() => {
  //   async function getPortfolioStocks() {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/portfolio/${id}`
  //       );
  //       setStockItems(response.data.stocks);
  //       //console.log(response);
  //       return response.data.stocks;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   async function stockDataExternal() {
  //     try {
  //       const nextResponse = await axios.get(
  //         `https://api.twelvedata.com/quote?symbol=${tickers}&apikey=${portfolioAPIKey1}`
  //       );
  //       //console.log(myStocksIds);
  //       console.log(nextResponse);
  //       setExternalAPIstocks(nextResponse.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   async function fetchMultipleCompanies() {
  //     try {
  //       //console.log(myStocksIds);
  //       const { data } = await axios.get(
  //         `https://api.twelvedata.com/time_series?symbol=${tickers}&interval=1h&outputsize=8&format=JSON&dp=2&apikey=${portfolioAPIKey2}`
  //       );
  //       console.log(data);
  //       setAllCompanies(data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   async function fetchStocks() {
  //     try {
  //       const stockInfos = await axios.get("http://localhost:3000/api/stocks");
  //       getStockData(stockInfos.data);
  //       console.log(stockInfos.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   getPortfolioStocks();
  //   stockDataExternal();
  //   fetchMultipleCompanies();
  //   fetchStocks();
  // }, [id]);

  return isAuthenticated ? (
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
        <PortfolioChart intervalSum={intervalSum} />
      </div>
      <div className="portfolio_available_amount">
        <h4>Available amount</h4>
        <h4>€</h4>
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
          className="btn btn-primary"
          style={{ marginRight: "0.5rem" }}
        >
          Order book
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() =>
            Navigate(`/transactions/${id}`, {
              state: location.state,
            })
          }
        >
          Buy/Sell
        </button>
      </div>
      <Navbar />
    </>
  ) : (
    <div>
      <div className="d-flex justify-content-center">
        <Message style={{ color: "red" }}>
          You are not logged in, please login!
        </Message>
      </div>
      <LogIn />
    </div>
  );
}
