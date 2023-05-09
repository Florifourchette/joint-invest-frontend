import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Image } from "semantic-ui-react";

export default function TransactionCardPending({
    stock,
    location,
    handlePurchase,
    handleDecline,
    handleCancelRequest,
    locationState,
}) {
    console.log(location);
    console.log("locationState", locationState);

    const { contextStockData } = useAppContext();

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
            <div className=" middle-column-pending">
                <h6 className="transactions-company">
                    {stock?.company_id && (
                        <>
                            {stock.company_id}{" "}
                            {/* <span>{location.number_of_shares[stock.company_id]}</span> */}
                        </>
                    )}
                </h6>
                <div className="pending-message">
                    {location.userId != stock.user_id &&
                        stock.number_of_shares >= 2 && (
                            <h6>
                                {location.friend} requests to{" "}
                                {stock.type_of_transaction.toLowerCase()}{" "}
                                {stock.number_of_shares} stocks{" "}
                            </h6>
                        )}
                    {location.userId != stock.user_id &&
                        stock.number_of_shares < 2 && (
                            <p>
                                {location.friend} requests to{" "}
                                {stock.type_of_transaction.toLowerCase()}{" "}
                                {stock.number_of_shares} stock{" "}
                            </p>
                        )}
                    {location.userId == stock.user_id &&
                        stock.number_of_shares >= 2 && (
                            <p>
                                You requested to{" "}
                                {stock.type_of_transaction.toLowerCase()}{" "}
                                {stock.number_of_shares} stocks{" "}
                            </p>
                        )}
                    {location.userId == stock.user_id &&
                        stock.number_of_shares < 2 && (
                            <p>
                                You requested to{" "}
                                {stock.type_of_transaction.toLowerCase()}{" "}
                                {stock.number_of_shares} stock{" "}
                            </p>
                        )}
                </div>
            </div>

            <div className="confirm-decline-btns">
                {location.userId != stock.user_id && (
                    <button
                        className="transactions_button"
                        onClick={() =>
                            handlePurchase(
                                stock.company_id,
                                stock.company_name,
                                stock.id,
                                stock.number_of_shares
                            )
                        }
                    >
                        Confirm
                    </button>
                )}
                {location.userId != stock.user_id && (
                    <button
                        className="transactions_button"
                        style={{
                            backgroundColor: "#84714F",
                            backgroundImage: "none",
                        }}
                        onClick={() =>
                            handleDecline(
                                stock.company_id,
                                stock.company_name,
                                stock.id,
                                stock.number_of_shares
                            )
                        }
                    >
                        Decline
                    </button>
                )}
                {location.userId == stock.user_id && (
                    <button
                        className="transactions_button"
                        onClick={() => handleCancelRequest(stock.id)}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}
