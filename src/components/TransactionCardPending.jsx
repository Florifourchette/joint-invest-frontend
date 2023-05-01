import React, { useState } from "react";

export default function TransactionCardPending({
    stock,
    location,
    handlePurchase,
    handleDecline,
    handleCancelRequest,
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
                {location.userId != stock.user_id &&  stock.number_of_shares >= 2 &&(
                    <p>{location.friend} requests to {stock.type_of_transaction} {stock.number_of_shares} stocks </p>
                )}
                {location.userId != stock.user_id && stock.number_of_shares < 2 && (
                    <p>{location.friend} requests to {stock.type_of_transaction} {stock.number_of_shares} stock </p>
                )}
                {location.userId == stock.user_id && stock.number_of_shares >= 2 &&(
                    <p>You requested to {stock.type_of_transaction} {stock.number_of_shares} stocks </p>
                )}
                {location.userId == stock.user_id && stock.number_of_shares < 2 && (
                    <p>You requested to {stock.type_of_transaction} {stock.number_of_shares} stock </p>
                )}
                
            </div>
            <div className="confirm-decline-btns">
                {location.userId != stock.user_id &&<button
                    className="confirm-decline-btn"
                    onClick={() =>
                        handlePurchase(stock.company_id, stock.company_name, stock.id, stock.number_of_shares)
                    }
                >
                    Confirm
                </button>}
                {location.userId != stock.user_id &&<button
                    className="confirm-decline-btn"
                    onClick={() =>
                        handleDecline(stock.company_id, stock.company_name, stock.id, stock.number_of_shares)
                    }
                >
                    Decline
                </button>}
                {location.userId == stock.user_id && <button
                    className="confirm-decline-btn"
                    onClick={() =>
                        handleCancelRequest(stock.id)
                    }
                >
                    Cancel
                </button>}
            </div>
        </div>
    );
}
