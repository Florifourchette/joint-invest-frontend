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
  const [logo, setLogo] = useState();

  const [counter, setCounter] = useState(1);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  useEffect(() => {
    const theLogo = contextStockData.find(
      (alogo) => alogo.companyid == stock.company_id
    );
    setLogo(theLogo.logo);
    console.log(theLogo.logo);
  }, []);

  return (
    <div key={stock.id} className="transactions-card">
      <div>
        <Image
          style={{ height: "40px", width: "40px" }}
          avatar
          src={logo ? `/company_logos/${logo}` : `/company_logos/NO_LOGO.png`}
        />
      </div>
      <div className="your-stock-name-price">
        <h4>
          {stock.company_id}{" "}
          <span>{location.number_of_shares[stock.company_id]}</span>
        </h4>
        {Object.keys(location.prices).length !== 0 && (
          <h4>Price: {Number(location.prices[stock.company_id]).toFixed(2)}</h4>
        )}
      </div>
      <div className="stock-counter">
        <button onClick={decreaseCounter} className="hex-button-small">
          -
        </button>
        {counter}
        <button onClick={increaseCounter} className="hex-button-small">
          +
        </button>
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
