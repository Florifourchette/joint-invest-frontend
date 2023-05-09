import React, { useState } from 'react';

export default function TransactionCardSearch({
  selectedOption,
  handleBuy,
  companyId,
  companyName,
  selectedOptionPrice,
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
        <h5>{selectedOption}</h5>
        <h5>Price: {selectedOptionPrice}</h5>
      </div>
      <div className="stock-counter">
        <button
          onClick={decreaseCounter}
          className="hex-button-small transactionSearchBtn"
        >
          -
        </button>
        <h5>{counter}</h5>
        <button
          onClick={increaseCounter}
          className="hex-button-small transactionSearchBtn"
        >
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
