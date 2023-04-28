import React, { useEffect, useState } from "react";
import { getTransactionsData } from "../../utils/APIcalls";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { transaction } from "../../utils/TransactionOperations";
import ReactModal from "react-modal";
import ModalTransactionBuy from "../components/ModalTransactionBuy";
import ModalTransactionSell from "../components/ModalTransactionSell";

export default function Transactions() {
    let { portfolioId } = useParams();

    const location = useLocation();

    console.log(` location at transactions ${JSON.stringify(location.state)}`);

    //STATES
    const [yourStocks, setYourStocks] = useState([]);
    const [counter, setCounter] = useState(1);
    const [transactionPrice, setTransactionPrice] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);

    //buy - sales
    const handleBuy = (companyId) => {
        const selectedAmmount = counter;
        transaction(companyId, selectedAmmount, (data) => {
            setTransactionPrice(data);
            setSelectedStock(companyId);
        });
        setShowModal(true);
    };

    const handleSell = (companyId) => {
        const selectedAmmount = counter;
        transaction(companyId, selectedAmmount, (data) => {
            setTransactionPrice(data);
            setSelectedStock(companyId);
        });
        setShowModal(true);
    };

    //Modal Controlls
    const handleConfirm = () => {
        // update the state of the parent component here
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getTransactionsData(portfolioId)
            .then((data) => {
                console.log(data);
                setYourStocks(data);
            })
            .catch((error) => console.error(error));
    }, [portfolioId]);

    console.log(yourStocks);

    // function to increase the counter
    const increaseCounter = () => {
        setCounter(counter + 1);
    };

    // function to decrease the counter
    const decreaseCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    };

    return (
        <div>
            <div className="transactions-title">
                <h1>Buy/Sell</h1>
                <p>
                    Once both partners have confirmed we will process your
                    request
                </p>
            </div>
            <div className="SearchBar">SearchBar goes here</div>
            <div className="your-stocks">
                <h2>Your Stocks</h2>
                <div className="your-portfolio-stocks">
                    {yourStocks.map((stock) => (
                        <div key={stock.id} className="your-stock-card">
                            <span className="your-stock-logo">Logo</span>
                            <div className="your-stock-name-price">
                                <h4>
                                    {stock.company_id}{" "}
                                    <span>{stock.number_of_shares}</span>
                                </h4>
                                <h4>
                                    Price:{" "}
                                    {Number(
                                        location.state.prices[stock.company_id]
                                    ).toFixed(2)}
                                </h4>
                            </div>
                            <div className="stock-counter">
                                <button onClick={decreaseCounter}>-</button>
                                {counter}
                                <button onClick={increaseCounter}>+</button>
                            </div>
                            <div className="buy-sell-btns">
                                <button
                                    className="buy-sell-btn"
                                    onClick={() => handleBuy(stock.company_id)}
                                >
                                    Buy
                                </button>
                                <button 
                                    className="buy-sell-btn"
                                    onClick={() => handleSell(stock.company_id)}
                                    
                                    >Sell</button>
                            </div>
                            {selectedStock === stock.company_id &&
                                showModal && (
                                    <ModalTransactionBuy
                                        message={`Are you sure you want to buy ${
                                            stock.company_id
                                        } at ${Number(
                                            transactionPrice.price
                                        ).toFixed(2)}?`}
                                        handleConfirm={handleConfirm}
                                        handleCancel={handleCancel}
                                        showModal={showModal}
                                        centered
                                    />
                                )}

                            {selectedStock === stock.company_id &&
                                showModal && (
                                    <ModalTransactionBuy
                                        message={`Are you sure you want to Sell ${
                                            stock.company_id
                                        } at ${Number(
                                            transactionPrice.price
                                        ).toFixed(2)}?`}
                                        handleConfirm={handleConfirm}
                                        handleCancel={handleCancel}
                                        showModal={showModal}
                                        centered
                                    />
                                )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
