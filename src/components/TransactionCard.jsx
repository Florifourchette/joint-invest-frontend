import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Image } from "semantic-ui-react";

export default function TransactionCard({
  stock,
  handleBuy,
  handleSell,
  location,
}) {
  const { contextStockData } = useAppContext();

  const [counter, setCounter] = useState(1);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  // useEffect(() => {
  //   const theLogo = contextStockData.find(
  //     (alogo) => alogo.companyid == stock.company_id
  //   );
  //   setLogo(theLogo.logo);
  //   console.log(theLogo.logo);
  // }, []);

  const insertLogo = (stockData, companyId) => {
    const theLogo = stockData.find((alogo) => alogo.companyid == companyId);
    console.log(theLogo);
    if (theLogo) {
      return `/company_logos/${theLogo.logo}`;
    }
    return "/company_logos/NO_LOGO.png";
  };

  return (
    <div key={stock.id} className="transactions-card">
      <div className="transactions-left-column">
        <Image
          style={{ height: "40px", width: "40px" }}
          avatar
          src={insertLogo(contextStockData, stock.company_id)}
        />
      </div>
      <div className="transactions-middle-column">
        <div className="padding-bottom">
          <h4>
            {stock.company_id}{" "}
            {/* <span>{location.number_of_shares[stock.company_id]}</span> */}
          </h4>
        </div>
        <div className="padding-bottom">
          {Object.keys(location.prices).length !== 0 && (
            <h4 className="transactions-price">
              Price: {Number(location.prices[stock.company_id]).toFixed(2)}
            </h4>
          )}
        </div>
        <div className="stock-counter-transactions-card">
          <button
            onClick={decreaseCounter}
            className="hex-button-small-transaction-card"
          >
            -
          </button>

          {counter}

          <button
            onClick={increaseCounter}
            className="hex-button-small-transaction-card"
          >
            +
          </button>
        </div>
      </div>
      <div className="buy-sell-btns">
        <button
          className="transactions_button"
          onClick={() =>
            handleBuy(stock.company_id, stock.company_name, counter)
          }
        >
          Buy
        </button>
        <button
          className="transactions_button"
          onClick={() =>
            handleSell(stock.company_id, stock.company_name, counter)
          }
        >
          Sell
        </button>
      </div>
    </div>
  );
}
