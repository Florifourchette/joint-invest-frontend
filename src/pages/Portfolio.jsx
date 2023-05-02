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

export default function Portfolio() {
  const { isAuthenticated } = useAuth();
  const portfolioName = mockPortfolioData[0].overview[0].name_of_portfolio;
  const investedAmount = mockPortfolioData[0].overview[0].invested_amount;
  const availableAmount = mockPortfolioData[0].overview[0].available_amount;
  const companiesArray = [];
  const hourlyValues = [];
  const hourArray = [];

  let { id } = useParams();

  const Navigate = useNavigate();
  const location = useLocation();
  console.log(` location at portfolio ${JSON.stringify(location.state)}`);

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
  const [allCompanies, setAllCompanies] = useState();
  const { totalAssets, totalAmountInvested } = location.state;

  console.log(stockItems);

  if (allCompanies !== undefined) {
    const stockValues = Object.values(allCompanies)?.map(
      (company) => company.values
    );
    //console.log(typeof stockValues);

    /*    const hourArray = stockValues.map((subArray) =>
      subArray.map((obj) => parseInt(obj.datetime.substring(10, 13)) - 6)
    );

    console.log(hourArray); */

    const closeValues = stockValues?.map((subArray) =>
      subArray?.map((obj) => obj.close)
    );

    //console.log(closeValues);
    //console.log(typeof closeValues);

    if (closeValues !== undefined) {
      for (const [index, item] of closeValues.entries()) {
        closeValues[index]["current_total_value"] = [];
        //console.log(index);

        for (const [index2, stockValueItem] of closeValues[index].entries()) {
          closeValues[index]["current_total_value"].push(
            stockItems[0]?.current_number_of_stocks * parseFloat(item[index2])
          );
          //console.log(closeValues);
        }
      }
    }
    //console.log(typeof closeValues);

    const currentTotalValueArray = closeValues?.map(
      (subArray) => subArray.current_total_value
    );

    //console.log(currentTotalValueArray);

    for (let i = 0; i < currentTotalValueArray[0].length; i++) {
      let sum = 0;
      for (let j = 0; j < currentTotalValueArray.length; j++) {
        sum += currentTotalValueArray[j][i];
      }
      hourlyValues.push(sum);
    }
    //console.log(hourlyValues);
  }

  //api calls

  useEffect(() => {
    async function getPortfolioStocks() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/portfolio/${id}`
        );
        setStockItems(response.data.stocks);
        setStockOverview(response.data.overview[0]);
        console.log(response);
        return response.data.stocks;
      } catch (err) {
        console.log(err);
      }
    }
    async function someIdRetrieving() {
      try {
        const inputStuff = await getPortfolioStocks();
        console.log(inputStuff);
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
          `https://api.twelvedata.com/quote?symbol=${myStocksIds}&apikey=${
            import.meta.env.VITE_API_KEY
          }`
        );
        console.log(myStocksIds);
        //console.log(nextResponse);
        setExternalAPIstocks(nextResponse.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchMultipleCompanies() {
      try {
        const myStocksIds = await someIdRetrieving();
        //console.log(myStocksIds);
        const { data } = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${myStocksIds}&interval=1h&outputsize=8&format=JSON&dp=2&apikey=${
            import.meta.env.VITE_API_KEY2
          }`
        );
        //console.log(data);
        setAllCompanies(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    stockDataExternal();
    fetchMultipleCompanies();
  }, []);

  /* return isAuthenticated ? ( */
  return (
    <>
      <div className="portfolio_overview">
        <h1>{portfolioName}</h1>
        <h3>Total Assets</h3>
        <h1>{totalAssets}</h1>
        <h4>Amount invested</h4>
        <h4>{investedAmount}</h4>
        <p>Total loss</p>
        <p>???????</p>
      </div>
      <div className="portfolio_lineGraph">
        <PortfolioChart hourlyValues={hourlyValues} hourArray={hourArray[0]} />
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
              externalAPIstocks &&
              stockItems?.map((item) => {
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
              stockItems?.map((item) => {
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
  /* : (
    <div>
      <div className="d-flex justify-content-center">
        <Message style={{ color: "red" }}>
          You are not logged in, please login!
        </Message>
      </div>
      <LogIn />
    </div>
  ); */
}
