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

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useParams } from "react-router-dom";

Chart.register(CategoryScale);

export default function Portfolio() {
  const portfolioName = mockPortfolioData[0].overview[0].name_of_portfolio;
  const investedAmount = mockPortfolioData[0].overview[0].invested_amount;
  const availableAmount = mockPortfolioData[0].overview[0].available_amount;

  const [selectedInterval, setSelectedInterval] = useState("");
  const [stockItems, setStockItems] = useState([]);
  const [stockOverview, setStockOverview] = useState();
  const [stockCompaniesId, setStockCompaniesId] = useState();
  const [externalAPIstocks, setExternalAPIstocks] = useState();
  const [allCompanies, setAllCompanies] = useState("");
  const { id } = useParams();

  console.log({ id });

  //Daily chart

  const fakeData = {
    TSLA: {
      meta: {
        symbol: "TSLA",
        interval: "1h",
        currency: "USD",
        exchange_timezone: "America/New_York",
        exchange: "NASDAQ",
        mic_code: "XNGS",
        type: "Common Stock",
      },
      values: [
        {
          datetime: "2023-04-27 10:30:00",
          open: "155.30",
          high: "157.96",
          low: "154.38",
          close: "157.63",
          volume: "21256531",
        },
        {
          datetime: "2023-04-27 09:30:00",
          open: "152.77",
          high: "156.23",
          low: "152.37",
          close: "155.27",
          volume: "36621472",
        },
        {
          datetime: "2023-04-26 15:30:00",
          open: "154.96",
          high: "155.14",
          low: "153.14",
          close: "153.64",
          volume: "12579103",
        },
        {
          datetime: "2023-04-26 14:30:00",
          open: "156.31",
          high: "156.45",
          low: "154.12",
          close: "154.96",
          volume: "16191548",
        },
        {
          datetime: "2023-04-26 13:30:00",
          open: "156.84",
          high: "157.19",
          low: "155.57",
          close: "156.31",
          volume: "13396384",
        },
        {
          datetime: "2023-04-26 12:30:00",
          open: "155.85",
          high: "157.07",
          low: "155.30",
          close: "156.84",
          volume: "15810229",
        },
        {
          datetime: "2023-04-26 11:30:00",
          open: "154.84",
          high: "156.50",
          low: "154.83",
          close: "155.85",
          volume: "17208301",
        },
        {
          datetime: "2023-04-26 10:30:00",
          open: "154.34",
          high: "156.38",
          low: "153.92",
          close: "154.85",
          volume: "25632615",
        },
      ],
      status: "ok",
    },
    AAPL: {
      meta: {
        symbol: "AAPL",
        interval: "1h",
        currency: "USD",
        exchange_timezone: "America/New_York",
        exchange: "NASDAQ",
        mic_code: "XNGS",
        type: "Common Stock",
      },
      values: [
        {
          datetime: "2023-04-27 10:30:00",
          open: "166.27",
          high: "166.90",
          low: "166.12",
          close: "166.68",
          volume: "6480924",
        },
        {
          datetime: "2023-04-27 09:30:00",
          open: "165.19",
          high: "166.41",
          low: "165.19",
          close: "166.26",
          volume: "13316351",
        },
        {
          datetime: "2023-04-26 15:30:00",
          open: "163.64",
          high: "164.19",
          low: "163.36",
          close: "163.73",
          volume: "6388204",
        },
        {
          datetime: "2023-04-26 14:30:00",
          open: "163.76",
          high: "163.80",
          low: "163.31",
          close: "163.63",
          volume: "3759754",
        },
        {
          datetime: "2023-04-26 13:30:00",
          open: "164.18",
          high: "164.19",
          low: "163.35",
          close: "163.76",
          volume: "3810347",
        },
        {
          datetime: "2023-04-26 12:30:00",
          open: "165.03",
          high: "165.04",
          low: "164.04",
          close: "164.18",
          volume: "3322966",
        },
        {
          datetime: "2023-04-26 11:30:00",
          open: "164.62",
          high: "165.28",
          low: "164.40",
          close: "165.03",
          volume: "4267382",
        },
        {
          datetime: "2023-04-26 10:30:00",
          open: "163.31",
          high: "164.88",
          low: "163.27",
          close: "164.62",
          volume: "5346521",
        },
      ],
      status: "ok",
    },
    AMZN: {
      meta: {
        symbol: "AMZN",
        interval: "1h",
        currency: "USD",
        exchange_timezone: "America/New_York",
        exchange: "NASDAQ",
        mic_code: "XNGS",
        type: "Common Stock",
      },
      values: [
        {
          datetime: "2023-04-27 10:30:00",
          open: "108.60",
          high: "109.66",
          low: "108.41",
          close: "109.50",
          volume: "15699380",
        },
        {
          datetime: "2023-04-27 09:30:00",
          open: "108.17",
          high: "108.76",
          low: "106.80",
          close: "108.60",
          volume: "24548850",
        },
        {
          datetime: "2023-04-26 15:30:00",
          open: "105.15",
          high: "105.27",
          low: "104.86",
          close: "104.97",
          volume: "7058804",
        },
        {
          datetime: "2023-04-26 14:30:00",
          open: "105.77",
          high: "105.79",
          low: "104.94",
          close: "105.14",
          volume: "6440210",
        },
        {
          datetime: "2023-04-26 13:30:00",
          open: "105.77",
          high: "106.06",
          low: "105.35",
          close: "105.77",
          volume: "5619249",
        },
        {
          datetime: "2023-04-26 12:30:00",
          open: "106.24",
          high: "106.25",
          low: "105.55",
          close: "105.78",
          volume: "5499193",
        },
        {
          datetime: "2023-04-26 11:30:00",
          open: "105.81",
          high: "106.62",
          low: "105.63",
          close: "106.24",
          volume: "8226053",
        },
        {
          datetime: "2023-04-26 10:30:00",
          open: "105.67",
          high: "106.08",
          low: "104.90",
          close: "105.81",
          volume: "9757785",
        },
      ],
      status: "ok",
    },
    GOOG: {
      meta: {
        symbol: "GOOG",
        interval: "1h",
        currency: "USD",
        exchange_timezone: "America/New_York",
        exchange: "NASDAQ",
        mic_code: "XNGS",
        type: "Common Stock",
      },
      values: [
        {
          datetime: "2023-04-27 10:30:00",
          open: "107.25",
          high: "108.33",
          low: "107.10",
          close: "108.18",
          volume: "5297772",
        },
        {
          datetime: "2023-04-27 09:30:00",
          open: "105.25",
          high: "107.52",
          low: "104.42",
          close: "107.24",
          volume: "8691596",
        },
        {
          datetime: "2023-04-26 15:30:00",
          open: "104.30",
          high: "104.73",
          low: "104.24",
          close: "104.40",
          volume: "3192222",
        },
        {
          datetime: "2023-04-26 14:30:00",
          open: "104.40",
          high: "104.42",
          low: "104.02",
          close: "104.29",
          volume: "2797237",
        },
        {
          datetime: "2023-04-26 13:30:00",
          open: "104.36",
          high: "104.73",
          low: "104.13",
          close: "104.41",
          volume: "2511687",
        },
        {
          datetime: "2023-04-26 12:30:00",
          open: "105.17",
          high: "105.17",
          low: "104.14",
          close: "104.36",
          volume: "3155977",
        },
        {
          datetime: "2023-04-26 11:30:00",
          open: "105.66",
          high: "105.75",
          low: "104.97",
          close: "105.17",
          volume: "4304200",
        },
        {
          datetime: "2023-04-26 10:30:00",
          open: "105.94",
          high: "106.44",
          low: "105.60",
          close: "105.67",
          volume: "4676983",
        },
      ],
      status: "ok",
    },
  };

  console.log(stockCompaniesId);

  //console.log(typeof stockCompaniesId);

  //console.log(typeof Object.values(stockItems));

  //const companyIds = Object.values(stockItems).map((stock) => stock.company_id);

  //console.log(typeof companyIds);

  //const cleanCompanyIds = companyIds.join();

  //console.log(cleanCompanyIds);

  //AXIOS
  // useEffect(() => {
  //   console.log({ id });
  //   axios
  //     .get(`http://localhost:3001/api/portfolio/${id}`)
  //     .then(function(response) {
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // });
  useEffect(() => {
    /* const fetchMultipleCompanies = fetch(
      `https://api.twelvedata.com/time_series?symbol=${stockCompaniesId}&interval=1h&outputsize=8&format=JSON&dp=2&apikey=6a897c4468e74344b1546b36728e991b`
    )
      .then((response) => response.json())
      .then((parsedData) => {
        console.log(parsedData);
        setAllCompanies(parsedData);
      })
      .catch((error) => console.log(error.message)); */
    console.log(stockCompaniesId);
  }, [stockCompaniesId]);

  //console.log(allCompanies);

  const stockValues = Object.values(fakeData).map((company) => company.values);

  //console.log(stockValues);

  const closeValues = stockValues.map((subArray) =>
    subArray.map((obj) => obj.close)
  );

  console.log(closeValues);
  if (closeValues !== undefined) {
    for (const [index, item] of closeValues.entries()) {
      closeValues[index]["current_total_value"] = [];
      console.log(index);

      for (const [index2, stockValueItem] of closeValues[index].entries()) {
        closeValues[index]["current_total_value"].push(
          stockItems[0]?.current_number_of_stocks * parseFloat(item[index2])
        );
        console.log(closeValues);
      }

      //processedStockItems[index] = stockItems;
      //processedStockItems[index]["current_total_value"] = current_total_value;
      //console.log(current_total_value);
    }
  }
  console.log(closeValues);

  //api calls

  useEffect(() => {
    async function getPortfolioStocks() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/portfolio/${id}`
        );
        setStockItems(response.data.stocks);
        setStockOverview(response.data.overview[0]);
        console.log(response);
        //console.log(response.data.stocks);
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
          `https://api.twelvedata.com/quote?symbol=${myStocksIds}&apikey=6a897c4468e74344b1546b36728e991b`
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
        <button type="button" class="btn btn-primary">
          Buy/Sell
        </button>
      </div>
    </>
  );
}
