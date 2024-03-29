import React from 'react';
import { useState, useEffect } from 'react';
import StockListA from '../components/PortfolioStockListA';
import StockListB from '../components/PortfolioStockListB';
import PortfolioChart from '../components/PortfolioChart.jsx';
import PortfolioDropdown from '../components/PortfolioDropdown';
import { stocklistitem_data } from '../assets/stocklistitem_data';
import { v4 as uuidv4 } from 'uuid';
import { mockPortfolioData } from '../assets/mockPortfolioData';
//import chartData from "../assets/lineGraphData";
//import { url } from "inspector";
import axios from 'axios';
import {
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import Navbar from '../components/Navbar';
import { BiArrowBack } from 'react-icons/bi';
import PortfolioChartOverall from '../components/PortfolioChartOverall';
import AuthIssue from '../components/AuthIssue';

Chart.register(CategoryScale);

const portfolioAPIKey1 = import.meta.env.VITE_PORTFOLIO_API_KEY1;
const portfolioAPIKey2 = import.meta.env.VITE_PORTFOLIO_API_KEY2;

export default function Portfolio() {
  const { isAuthenticated } = useAuth();
  const portfolioName =
    mockPortfolioData[0].overview[0].name_of_portfolio;
  const investedAmount =
    mockPortfolioData[0].overview[0].invested_amount;
  const availableAmount =
    mockPortfolioData[0].overview[0].available_amount;
  const companiesArray = [];

  const { id } = useParams();

  const Navigate = useNavigate();
  const location = useLocation();
  console.log(
    ` location at portfolio ${JSON.stringify(location.state)}`
  );

  console.log(location.state.profitLoss);
  const [sharePrice, setSharePrice] = useState(location.state.prices);
  const [shareNumber, setShareNumber] = useState(
    location.state.number_of_shares
  );
  const tickers = Object.keys(sharePrice).join();
  const tickers_cache = Object.keys(sharePrice).join('');

  const companyIds = mockPortfolioData[0].stocks?.map(
    (stock) => stock.company_id
  );
  const cleanCompanyIds = companyIds.join();

  const [selectedInterval, setSelectedInterval] = useState('');
  const [stockItems, setStockItems] = useState([]);
  const [stockOverview, setStockOverview] = useState();
  const [stockCompaniesId, setStockCompaniesId] = useState();
  const [externalAPIstocks, setExternalAPIstocks] = useState();
  const [allCompanies, setAllCompanies] = useState();

  const [orderBook, setOrderBook] = useState();

  const handleBack = (e) => {
    e.preventDefault();
    Navigate(-1);
  };

  const datetimeValuesMap = {};

  let values = [];
  if (allCompanies && Object.keys(allCompanies).length > 0) {
    for (const key in allCompanies) {
      if (allCompanies[key].values !== undefined) {
        values = allCompanies[key].values;
      } else {
        values = allCompanies.values;
      }

      if (typeof values === 'object') {
        {
          for (const value of values) {
            const datetime = value.datetime;
            if (datetime in datetimeValuesMap) {
              const properties = Object.keys(value);

              for (const property of properties) {
                if (property !== 'datetime') {
                  if (Object.values(shareNumber).length !== 1) {
                    datetimeValuesMap[datetime][property] +=
                      parseFloat(value[property]) *
                      parseFloat(shareNumber[key]);
                  } else {
                    datetimeValuesMap[datetime][property] +=
                      parseFloat(value[property]) *
                      parseFloat(Object.values(shareNumber));
                  }
                }
              }
            } else {
              datetimeValuesMap[datetime] = { datetime };
              const properties = Object.keys(value);
              for (const property of properties) {
                if (property !== 'datetime') {
                  if (Object.values(shareNumber).length !== 1) {
                    datetimeValuesMap[datetime][property] =
                      parseFloat(value[property]) *
                      parseFloat(shareNumber[key]);
                  } else {
                    datetimeValuesMap[datetime][property] =
                      parseFloat(value[property]) *
                      parseFloat(Object.values(shareNumber));
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  const intervalSum = Object.values(datetimeValuesMap);

  // Extract the summed value at the last timestamp
  const timestamps = Object.keys(datetimeValuesMap);
  const lastTimestamp = timestamps[timestamps.length - 1];
  const lastValues = datetimeValuesMap[lastTimestamp];

  //api calls

  useEffect(() => {
    async function getOrderBook() {
      try {
        const response = await axios.get(
          `https://joint-invest-back-end.onrender.com/api/order_book/${id}`
        );
        setOrderBook(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function getPortfolioStocks() {
      try {
        const response = await axios.get(
          `https://joint-invest-back-end.onrender.com/api/portfolio/${id}`
        );
        setStockItems(response.data.stocks);
        setStockOverview(response.data.overview[0]);
      } catch (err) {
        console.log(err);
      }
    }
    async function stockDataExternal() {
      try {
        const nextResponse = await axios.post(
          'https://joint-invest-back-end.onrender.com/api/external',
          {
            cacheKey: `currentQuotes_${tickers_cache}`,
            remoteUrl: `https://api.twelvedata.com/quote?symbol=${tickers}&apikey=${portfolioAPIKey2}`,
          }
        );
        if (nextResponse.data?.status !== 'error') {
          console.log(nextResponse);
          setExternalAPIstocks(nextResponse.data);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchMultipleCompanies() {
      try {
        //console.log(myStocksIds);
        const data = await axios.post(
          'https://joint-invest-back-end.onrender.com/api/external',
          {
            cacheKey: `currentTimeSeries_${tickers_cache}`,
            remoteUrl: `https://api.twelvedata.com/time_series?symbol=${tickers}&interval=1h&outputsize=8&format=JSON&dp=2&apikey=${portfolioAPIKey2}`,
          }
        );
        // const data = await axios.get();
        // console.log(data);
        if (data.data?.status !== 'error') {
          console.log(data);
          setAllCompanies(data.data);
        } else {
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    /* async function fetchStocks() {
      try {
        const stockInfos = await axios.get("http://localhost:3000/api/stocks");
        setStockData(stockInfos.data);
        console.log(stockInfos.data);
      } catch (error) {
        console.log(error.message);
      }
    } */
    getOrderBook();
    getPortfolioStocks();
    stockDataExternal();
    fetchMultipleCompanies();
    //fetchStocks();
  }, [id]);

  return isAuthenticated ? (
    <div className="portfolio-page">
      <div className="portfolio-back-button-container">
        <BiArrowBack
          className="portfolio-back-button"
          onClick={handleBack}
        />
      </div>
      <div className="portfolio_overview">
        <div className="overview_page">
          <h1 className="portfolio-title">Portfolio</h1>
          {stockOverview && (
            <h4 className="portfolio-name">
              {stockOverview.name_of_portfolio}
            </h4>
          )}
          <div className="assets">
            {lastValues && (
              <>
                <h3>Total Assets</h3>
                <h2>$ {lastValues.close.toFixed(2)}</h2>
              </>
            )}
            <h3>Amount invested</h3>
            {stockOverview && (
              <h4>
                {parseFloat(stockOverview.invested_amount).toFixed(2)}
              </h4>
            )}
            <h3>Total profit/loss</h3>
            {location.state.profitLoss > 0 ? (
              <h4 className="positive">
                {location.state.profitLoss.toFixed(2)}
                {/* {parseFloat(
                    lastValues.close - stockOverview.invested_amount
                  ).toFixed(2)} */}
              </h4>
            ) : (
              <h4 className="negative">
                {location.state.profitLoss.toFixed(2)}
                {/* {parseFloat(
                    lastValues.close - stockOverview.invested_amount
                  ).toFixed(2)} */}
              </h4>
            )}

            <h4>{location.state.portfolioProfitLoss}</h4>
            <h3>Available amount</h3>
            {stockOverview && (
              <h4>
                {parseFloat(stockOverview.available_amount).toFixed(
                  2
                )}
              </h4>
            )}
          </div>
        </div>
        <div className="portfolio-dropdown">
          <PortfolioDropdown
            className="dropdown"
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        </div>
        <div className="portfolio_stocks-container">
          {selectedInterval == 'Overall' ? (
            <div>
              <div className="portfolio_barGraph">
                <PortfolioChartOverall orderBook={orderBook} />
              </div>
              <div className="assets">
                <h3>Your stocks</h3>
              </div>
              <div className="stock-container">
                {stockItems &&
                  sharePrice &&
                  //stockData &&
                  externalAPIstocks &&
                  stockItems?.map((item) => {
                    return (
                      <StockListB
                        item={item}
                        externalAPIstocks={externalAPIstocks}
                        sharePrice={sharePrice}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            <div>
              <div className="portfolio_lineGraph">
                <PortfolioChart intervalSum={intervalSum} />
              </div>
              <div className="assets">
                <h3>Your stocks</h3>
              </div>
              <div className="stock-container">
                {stockItems &&
                  //stockData &&
                  sharePrice &&
                  externalAPIstocks &&
                  stockItems?.map((item) => {
                    return (
                      <StockListA
                        item={item}
                        externalAPIstocks={externalAPIstocks}
                        sharePrice={sharePrice}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <div className="button-box-portfolio d-flex justify-content-center flex-column align-items-center">
          <button
            type="button"
            className="hex-button"
            style={{
              marginRight: '1rem',
              marginBottom: '0.7rem',
              padding: '0px',
              height: '50px',
              width: '180px',
              background: '#84714F',
            }}
            onClick={() =>
              Navigate(`/orderbook/${id}`, {
                state: location.state,
              })
            }
          >
            Order book
          </button>
          {/* <button
            type="button"
            className="hex-button"
            style={{
              marginRight: "1rem",
              padding: "0px",
              height: "60px",
              width: "120px",
            }}
            onClick={() =>
              Navigate(`/orderbook/${id}`, {
                state: location.state,
              })
            }
          >
            <div
              className="hex-button-small d-flex justify-content-center align-items-center"
              style={{
                height: "50px",
                width: "110px",
                background: "#FFF3BE",
                color: "#31231e",
                margin: "0 auto 0 auto",
              }}
            >
              <p>Order book</p>
            </div>
          </button> */}
          <button
            type="button"
            className="hex-button"
            style={{
              marginRight: '0.5rem',
              padding: '10px',
              height: '50px',
              width: '180px',
            }}
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
      </div>
    </div>
  ) : (
    <AuthIssue />
  );
}
