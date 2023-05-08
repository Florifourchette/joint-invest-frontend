import React, { useState } from "react";

export default function TransactionCardSearch({
  selectedOption,
  handleBuy,
  companyId,
  companyName,
  selectedOptionPrice,
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
    <div className="buyShareCard">
      <div className="your-stock-name-price">
        <h4>{selectedOption}</h4>
        <h4>Price: {selectedOptionPrice}</h4>
      </div>
      <div className="stock-counter">
        <button
          onClick={decreaseCounter}
          className="hex-button-small-transaction-card"
        >
          -
        </button>
        {counter}
        <button onClick={increaseCounter} className="hex-button-small">
          +
        </button>
      </div>
      <div>
        <button
          className="hex-button-transactions"
          onClick={() => handleBuy(companyId, companyName, counter)}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
