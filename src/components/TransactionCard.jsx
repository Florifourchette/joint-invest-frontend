import React, { useState } from 'react';

export default function TransactionCard({
  stock,
  handleBuy,
  handleSell,
  location,
}) {
  const [counter, setCounter] = useState(1);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  return (
    <div key={stock.id} className="transactions-card">
      <span className="your-stock-logo">Logo</span>
      <div className="your-stock-name-price">
        <h4>
          {stock.company_id}{' '}
          <span>{location.number_of_shares[stock.company_id]}</span>
        </h4>
        {Object.keys(location.prices).length !== 0 && (<h4>
          Price:{' '}
          {Number(location.prices[stock.company_id]).toFixed(2)}
        </h4>)}
      </div>
      <div className="stock-counter">
        <button
          onClick={decreaseCounter}
          className="hex-button-small"
        >
          -
        </button>
        {counter}
        <button
          onClick={increaseCounter}
          className="hex-button-small"
        >
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
