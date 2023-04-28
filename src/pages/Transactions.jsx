import React, { useEffect, useState } from "react";
import { getTransactionsData } from "../../utils/APIcalls";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LogIn from "./LogIn";
import { Message } from "semantic-ui-react";

export default function Transactions() {
  const { isAuthenticated } = useAuth();
  let { portfolioId } = useParams();

  const location = useLocation();

  console.log(` location at transactions ${JSON.stringify(location.state)}`);

  //STATES
  const [yourStocks, setYourStocks] = useState([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    getTransactionsData(portfolioId)
      .then((data) => {
        console.log(data);
        setYourStocks(data);
      })
      .catch((error) => console.error(error));
  }, [portfolioId]);

  console.log(yourStocks);

  // function to increase the counter
  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  // function to decrease the counter
  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  return isAuthenticated ? (
    <div>
      <div className="transactions-title">
        <h1>Buy/Sell</h1>
        <p>Once both partners have confirmed we will process your request</p>
      </div>
      <div className="SearchBar">SearchBar goes here</div>
      <div className="your-stocks">
        <h2>Your Stocks</h2>
        <div className="your-portfolio-stocks">
          {yourStocks.map((stock) => (
            <div key={stock.id} className="your-stock-card">
              <span className="your-stock-logo">Logo</span>
              <div className="your-stock-name-price">
                <h4>
                  {stock.company_id} <span>{stock.number_of_shares}</span>
                </h4>
                <h4>
                  Price:{" "}
                  {Number(location.state.prices[stock.company_id]).toFixed(2)}
                </h4>
              </div>
              <div className="stock-counter">
                <button onClick={decreaseCounter}>-</button>
                {counter}
                <button onClick={increaseCounter}>+</button>
              </div>
              <div className="buy-sell-btns">
                <button className="buy-sell-btn">Buy</button>
                <button className="buy-sell-btn">Sell</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
