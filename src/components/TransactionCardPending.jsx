import React, { useState } from "react";

export default function TransactionCardPending({
    stock,
    location,
}) {

    console.log(location)
    
    return (
        <div key={stock.id} className="your-stock-card">
            <span className="your-stock-logo">Logo</span>
            <div className="your-stock-name-price">
                <h4>
                    {stock.company_id} <span>{location.number_of_shares[stock.company_id]}</span> 
                </h4>
                <h4>
                    Price:{" "}
                    {Number(location.prices[stock.company_id]).toFixed(2)}
                </h4>
            </div>
            <div className="pending-message">
                {location.userId != stock.user_id && (
                    <p>Your friend request to {stock.type_of_transaction} {stock.number_of_shares} stock </p>
                )}
                {location.userId == stock.user_id &&(
                    <p>You requested to {stock.type_of_transaction} {stock.number_of_shares} stock </p>
                )}
                
            </div>
            <div className="confirm-decline-btns">
                <button
                    className="confirm-decline-btn"

                >
                    Confirm
                </button>
                <button
                    className="confirm-decline-btn"

                >
                    Decline
                </button>
            </div>
        </div>
    );
}
