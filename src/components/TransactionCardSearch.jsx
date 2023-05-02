import React, { useState } from "react";

export default function TransactionCardSearch({
    selectedOption,
    handleBuy
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

    const [substring1, substring2] = selectedOption.split('(')
    const companyId = substring2?.slice(0,-1)
    const companyName = substring1
    return (
        <div className="your-stock-card">
            <div className="your-stock-name-price">
                <h4>
                    {selectedOption} 
                </h4>
                <h4>
                    Price:{" "}
    
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
