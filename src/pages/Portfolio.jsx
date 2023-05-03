import React from "react";
import { useState, useEffect } from "react";
import StockListA from "../components/PortfolioStockListA";
import StockListB from "../components/PortfolioStockListB";
import PortfolioChart from "../components/PortfolioChart.jsx";
import PortfolioDropdown from "../components/PortfolioDropdown";
import { stocklistitem_data } from "../assets/stocklistitem_data";
import { v4 as uuidv4 } from "uuid";
import { mockPortfolioData } from "../assets/mockPortfolioData";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LogIn from "./LogIn";
import { Message } from "semantic-ui-react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "../components/Navbar";

Chart.register(CategoryScale);

export default function Portfolio() {
  const { isAuthenticated } = useAuth();
  const hourArray = [];

  const { id } = useParams();

  const Navigate = useNavigate();
  const location = useLocation();
  console.log(` location at portfolio ${JSON.stringify(location.state)}`);
  const [sharePrice, setSharePrice] = useState(location.state.prices);
  const [shareNumber, setShareNumber] = useState(
    location.state.number_of_shares
  );

  console.log(sharePrice);
  console.log(shareNumber);

  const tickers = Object.keys(sharePrice).join();

  console.log(tickers);

  const [selectedInterval, setSelectedInterval] = useState("");
  const [stockItems, setStockItems] = useState([]);
  const [stockOverview, setStockOverview] = useState("");
  const [stockCompaniesId, setStockCompaniesId] = useState();
  const [externalAPIstocks, setExternalAPIstocks] = useState();
  const { totalAssets, totalAmountInvested } = location.state;
  const [hourlyCompanyValues, setHourlyCompanyValues] = useState();
  const [stockData, getStockData] = useState();
  const hourlyValues = [];

  console.log(stockItems);

  const getCloseValuesFromAllCompanies = (data) => {
    return Object.values(data).map((companyData) => {
      console.log(companyData);
      return companyData.map((stockData) => {
        return parseFloat(stockData.close);
      });
    });
  };

  //api calls
  useEffect(() => {
    async function getPortfolioStocks() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/portfolio/${id}`
        );
        setStockItems(response.data.stocks);
        console.log(response);
        return response.data.stocks;
      } catch (err) {
        console.log(err);
      }
    }
    async function stockDataExternal() {
      try {
        const nextResponse = await axios.get(
          `https://api.twelvedata.com/quote?symbol=${tickers}&apikey=${
            import.meta.env.VITE_API_KEY
          }`
        );
        //console.log(nextResponse);
        setExternalAPIstocks(nextResponse.data);
        return nextResponse.data;
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchMultipleCompanies() {
      try {
        const { data } = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${tickers}&interval=1h&outputsize=8&format=JSON&dp=2&apikey=${
            import.meta.env.VITE_API_KEY3
          }`
        );

        /* const data = {
    "TSLA": {
        "meta": {
            "symbol": "TSLA",
            "interval": "1h",
            "currency": "USD",
            "exchange_timezone": "America/New_York",
            "exchange": "NASDAQ",
            "mic_code": "XNGS",
            "type": "Common Stock"
        },
        "values": [
            {
                "datetime": "2023-05-02 15:30:00",
                "open": "159.98",
                "high": "160.62",
                "low": "158.93",
                "close": "160.26",
                "volume": "10504295"
            },
            {
                "datetime": "2023-05-02 14:30:00",
                "open": "160.32",
                "high": "161.07",
                "low": "159.86",
                "close": "159.97",
                "volume": "14112392"
            },
            {
                "datetime": "2023-05-02 13:30:00",
                "open": "161.22",
                "high": "162.24",
                "low": "160.16",
                "close": "160.30",
                "volume": "12797673"
            },
            {
                "datetime": "2023-05-02 12:30:00",
                "open": "161.32",
                "high": "162.41",
                "low": "161.16",
                "close": "161.22",
                "volume": "12148058"
            },
            {
                "datetime": "2023-05-02 11:30:00",
                "open": "161.19",
                "high": "161.42",
                "low": "159.75",
                "close": "161.33",
                "volume": "18864054"
            },
            {
                "datetime": "2023-05-02 10:30:00",
                "open": "164.32",
                "high": "164.45",
                "low": "161.01",
                "close": "161.17",
                "volume": "23654055"
            },
            {
                "datetime": "2023-05-02 09:30:00",
                "open": "162.59",
                "high": "165.49",
                "low": "161.90",
                "close": "164.03",
                "volume": "33941232"
            },
            {
                "datetime": "2023-05-01 15:30:00",
                "open": "161.13",
                "high": "162.11",
                "low": "160.93",
                "close": "161.78",
                "volume": "7078978"
            }
        ],
        "status": "ok"
    },
    "GOOG": {
        "meta": {
            "symbol": "GOOG",
            "interval": "1h",
            "currency": "USD",
            "exchange_timezone": "America/New_York",
            "exchange": "NASDAQ",
            "mic_code": "XNGS",
            "type": "Common Stock"
        },
        "values": [
            {
                "datetime": "2023-05-02 15:30:00",
                "open": "106.17",
                "high": "106.18",
                "low": "105.90",
                "close": "105.99",
                "volume": "1769338"
            },
            {
                "datetime": "2023-05-02 14:30:00",
                "open": "106.04",
                "high": "106.34",
                "low": "105.94",
                "close": "106.17",
                "volume": "1371693"
            },
            {
                "datetime": "2023-05-02 13:30:00",
                "open": "106.21",
                "high": "106.49",
                "low": "105.98",
                "close": "106.04",
                "volume": "1488288"
            },
            {
                "datetime": "2023-05-02 12:30:00",
                "open": "105.88",
                "high": "106.23",
                "low": "105.82",
                "close": "106.22",
                "volume": "1465810"
            },
            {
                "datetime": "2023-05-02 11:30:00",
                "open": "105.40",
                "high": "105.96",
                "low": "105.28",
                "close": "105.89",
                "volume": "2214677"
            },
            {
                "datetime": "2023-05-02 10:30:00",
                "open": "105.39",
                "high": "105.61",
                "low": "104.50",
                "close": "105.41",
                "volume": "4022546"
            },
            {
                "datetime": "2023-05-02 09:30:00",
                "open": "107.66",
                "high": "107.73",
                "low": "105.35",
                "close": "105.44",
                "volume": "5500244"
            },
            {
                "datetime": "2023-05-01 15:30:00",
                "open": "107.92",
                "high": "108.01",
                "low": "107.59",
                "close": "107.70",
                "volume": "3206595"
            }
        ],
        "status": "ok"
    }
} */

        console.log(data);
        const closeValues = getCloseValuesFromAllCompanies(data);
        console.log(closeValues);

        //working with the fetched data
      } catch (error) {
        console.log(error.message);
      }
    }
    async function fetchStocks() {
      try {
        const stockInfos = await axios.get("http://localhost:3000/api/stocks");
        getStockData(stockInfos.data);
        console.log(stockInfos.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPortfolioStocks();
    stockDataExternal();
    fetchMultipleCompanies();
    fetchStocks();
  }, []);

  return isAuthenticated ? (
    <>
      <div className="portfolio_overview">
        <h1>portfolioName</h1>
        <h3>Total Assets</h3>
        <h1>{totalAssets}</h1>
        <h4>Amount invested</h4>
        <h4>investedAmount</h4>
        <p>Total loss</p>
        <p>???????</p>
      </div>
      <div className="portfolio_lineGraph">
        <PortfolioChart
          hourlyValues={hourlyCompanyValues} /* hourArray={hourArray[0]} */
        />
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
          class="btn btn-primary"
          style={{ marginRight: "0.5rem" }}
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
