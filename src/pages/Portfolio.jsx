import React from "react";
import { useState, useEffect } from "react";
import StockListA from "../components/PortfolioStockListA";
import StockListB from "../components/PortfolioStockListB";
import PortfolioChart from "../components/PortfolioChart.jsx";
import PortfolioDropdown from "../components/PortfolioDropdown";
import { mockPortfolioData } from "../assets/mockPortfolioData";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
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
  const tickers = Object.keys(sharePrice).join();
  const tickersArray = Object.keys(sharePrice);

  console.log(sharePrice);
  console.log(shareNumber);
  console.log(tickers);

  const portfolioData = location.state;
  const ticker = Object.keys(portfolioData.number_of_shares).join();

  const [selectedInterval, setSelectedInterval] = useState("");
  const [stockItems, setStockItems] = useState([]);
  const [externalAPIstocks, setExternalAPIstocks] = useState();
  const { totalAssets, totalAmountInvested } = location.state;
  const [hourlyCompanyValues, setHourlyCompanyValues] = useState();
  const [stockData, getStockData] = useState();
  const hourlyValues = [];

  console.log(stockItems);

  const getCloseValuesFromAllCompanies = (data) => {
    return data.map((companyData) => {
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
          `https://api.twelvedata.com/quote?symbol=${ticker}&apikey=${
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
          `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1h&outputsize=8&format=JSON&dp=2&apikey=${
            import.meta.env.VITE_API_KEY3
          }`
        );

        /* const data = [
          [
            {
              datetime: "2023-05-02 09:30:00",
              open: "170.09",
              high: "170.35",
              low: "169.48",
              close: "169.50",
              volume: "4246286",
            },
            {
              datetime: "2023-05-01 15:30:00",
              open: "169.70",
              high: "169.90",
              low: "169.25",
              close: "169.56",
              volume: "5100536",
            },
            {
              datetime: "2023-05-01 14:30:00",
              open: "169.90",
              high: "169.96",
              low: "169.20",
              close: "169.69",
              volume: "5042479",
            },
            {
              datetime: "2023-05-01 13:30:00",
              open: "170.13",
              high: "170.41",
              low: "169.82",
              close: "169.92",
              volume: "3838143",
            },
            {
              datetime: "2023-05-01 12:30:00",
              open: "169.99",
              high: "170.45",
              low: "169.99",
              close: "170.14",
              volume: "5044388",
            },
            {
              datetime: "2023-05-01 11:30:00",
              open: "169.14",
              high: "170.19",
              low: "169.05",
              close: "169.98",
              volume: "4752404",
            },
            {
              datetime: "2023-05-01 10:30:00",
              open: "169.04",
              high: "169.83",
              low: "168.64",
              close: "169.13",
              volume: "6766083",
            },
            {
              datetime: "2023-05-01 09:30:00",
              open: "169.28",
              high: "170.29",
              low: "169.02",
              close: "169.04",
              volume: "13041419",
            },
          ],
          [
            {
              datetime: "2023-05-02 09:30:00",
              open: "107.66",
              high: "107.72",
              low: "106.91",
              close: "106.93",
              volume: "1848978",
            },
            {
              datetime: "2023-05-01 15:30:00",
              open: "107.92",
              high: "108.01",
              low: "107.59",
              close: "107.70",
              volume: "3206595",
            },
            {
              datetime: "2023-05-01 14:30:00",
              open: "108.19",
              high: "108.19",
              low: "107.78",
              close: "107.92",
              volume: "2972866",
            },
            {
              datetime: "2023-05-01 13:30:00",
              open: "108.42",
              high: "108.68",
              low: "108.19",
              close: "108.20",
              volume: "1622081",
            },
            {
              datetime: "2023-05-01 12:30:00",
              open: "108.15",
              high: "108.57",
              low: "108.08",
              close: "108.43",
              volume: "1836880",
            },
            {
              datetime: "2023-05-01 11:30:00",
              open: "107.89",
              high: "108.22",
              low: "107.71",
              close: "108.14",
              volume: "1860294",
            },
            {
              datetime: "2023-05-01 10:30:00",
              open: "108.02",
              high: "108.42",
              low: "107.50",
              close: "107.88",
              volume: "2872994",
            },
            {
              datetime: "2023-05-01 09:30:00",
              open: "107.76",
              high: "108.33",
              low: "107.62",
              close: "108.01",
              volume: "3848401",
            },
          ],
          [
            {
              datetime: "2023-05-02 09:30:00",
              open: "161.92",
              high: "165.49",
              low: "161.90",
              close: "163.93",
              volume: "13094278",
            },
            {
              datetime: "2023-05-01 15:30:00",
              open: "161.13",
              high: "162.11",
              low: "160.93",
              close: "161.78",
              volume: "7078978",
            },
            {
              datetime: "2023-05-01 14:30:00",
              open: "161.59",
              high: "161.61",
              low: "160.56",
              close: "161.12",
              volume: "11290405",
            },
            {
              datetime: "2023-05-01 13:30:00",
              open: "161.93",
              high: "162.64",
              low: "161.41",
              close: "161.58",
              volume: "10629849",
            },
            {
              datetime: "2023-05-01 12:30:00",
              open: "160.98",
              high: "162.43",
              low: "160.94",
              close: "161.94",
              volume: "12520029",
            },
            {
              datetime: "2023-05-01 11:30:00",
              open: "159.08",
              high: "161.12",
              low: "158.95",
              close: "160.96",
              volume: "15462301",
            },
            {
              datetime: "2023-05-01 10:30:00",
              open: "162.29",
              high: "162.57",
              low: "158.83",
              close: "159.09",
              volume: "21137020",
            },
            {
              datetime: "2023-05-01 09:30:00",
              open: "163.17",
              high: "163.28",
              low: "160.27",
              close: "162.30",
              volume: "28793808",
            },
          ],
          [
            {
              datetime: "2023-05-02 09:30:00",
              open: "101.48",
              high: "102.48",
              low: "101.15",
              close: "102.31",
              volume: "7079450",
            },
            {
              datetime: "2023-05-01 15:30:00",
              open: "102.25",
              high: "102.38",
              low: "101.82",
              close: "102.04",
              volume: "7964718",
            },
            {
              datetime: "2023-05-01 14:30:00",
              open: "102.50",
              high: "102.59",
              low: "102.02",
              close: "102.24",
              volume: "8274687",
            },
            {
              datetime: "2023-05-01 13:30:00",
              open: "102.89",
              high: "103.05",
              low: "102.43",
              close: "102.50",
              volume: "5411815",
            },
            {
              datetime: "2023-05-01 12:30:00",
              open: "102.83",
              high: "103.24",
              low: "102.81",
              close: "102.88",
              volume: "5259115",
            },
            {
              datetime: "2023-05-01 11:30:00",
              open: "102.36",
              high: "103.16",
              low: "102.24",
              close: "102.84",
              volume: "7922380",
            },
            {
              datetime: "2023-05-01 10:30:00",
              open: "103.79",
              high: "103.92",
              low: "102.20",
              close: "102.35",
              volume: "14935580",
            },
            {
              datetime: "2023-05-01 09:30:00",
              open: "104.90",
              high: "105.23",
              low: "103.47",
              close: "103.80",
              volume: "17283743",
            },
          ],
        ]; */

        //console.log(data);
        const closeValues = getCloseValuesFromAllCompanies(data);
        console.log(closeValues);

        console.log(stockItems);

        //working with the fetched data

        if (closeValues !== undefined) {
          closeValues.forEach((stockValues, index) => {
            closeValues[index] = stockValues.map((value) => {
              return (
                stockItems[0]?.current_number_of_stocks * parseFloat(value)
              );
            });
          });
        }

        console.log(stockValues);

        /* for (let i = 0; i < currentTotalValueArray[0].length; i++) {
          let sum = 0;
          for (let j = 0; j < currentTotalValueArray.length; j++) {
            sum += currentTotalValueArray[j][i];
          }
          hourlyValues.push(sum);
          setHourlyCompanyValues(hourlyValues);
        } */
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
          className="btn btn-primary"
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
