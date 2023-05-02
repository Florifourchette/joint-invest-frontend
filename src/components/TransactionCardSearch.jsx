import React, { useState } from "react";

export default function TransactionCardSearch({
    selectedOption,
    handleBuy,
    companyId,
    companyName,
    selectedOptionPrice
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
        <div className="your-stock-card">
            <div className="your-stock-name-price">
                <h4>
                    {selectedOption} 
                </h4>
                <h4>
                    Price:{" "}
                    {selectedOptionPrice}
                </h4>
            </div>
            <div className="stock-counter">
                <button onClick={decreaseCounter}>-</button>
                {counter}
                <button onClick={increaseCounter}>+</button>
            </div>
            <div className="buy-btns">
                <button
                    className="buy-btn"
                    onClick={() =>
                        handleBuy(companyId, companyName, counter)
                    }
                >
                    Buy
                </button>
            </div>
        </div>
    );
}
