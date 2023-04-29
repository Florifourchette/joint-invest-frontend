import React, { useEffect, useState } from "react";
import { getTransactionsData, writeTransaction } from "../../utils/APIcalls";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { transaction } from "../../utils/TransactionOperations";
import ReactModal from "react-modal";
import ModalTransactionBuy from "../components/ModalTransaction";
import TransactionCard from "../components/TransactionCard";

export default function Transactions() {
    let { portfolioId } = useParams();

    const location = useLocation();
    const userID = location.state.userId
    console.log('userID: ', userID);
    console.log(` location at transactions ${JSON.stringify(location.state)}`);

    //STATES
    const [yourStocks, setYourStocks] = useState([]);
    const [selectedAmmount, setSelectedAmmount] = useState(1);
    const [transactionPrice, setTransactionPrice] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [transactionData, setTransactionData] = useState([{}]);

    //buy - sales
    const handleBuy = (companyId, companyName, counter) => {
        setSelectedAmmount(counter);

        transaction(companyId, counter, companyName, (data) => {
            setTransactionPrice(data);
            setSelectedStock(companyId);
            setTransactionData((prevData) => ({
                number_of_shares: counter.toString(),
                company_id: companyId,
                type_of_transaction: "Buy",
                company_name: companyName,
                price_of_share: data.price,
                user_id: location.state.userId,
            }));

            setShowModal(true);
        });
    };
    const handleSell = (companyId, counter) => {
        setSelectedAmmount(counter);
        transaction(companyId, selectedAmmount, (data) => {
            setTransactionPrice(data);
            setSelectedStock(companyId);
            setTransactionData((prevData) => ({
                ...prevData,
                type_of_transaction: "Sell",
            }));
        });
        setShowModal(true);
    };

    //Modal Controlls
    const handleConfirm = () => {
        // update the state of the parent component here
        setShowModal(false);
        writeTransaction(portfolioId, transactionData);
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
            <div className="transactions-container">
                <div className="your-stocks">
                    <h2>Your Stocks</h2>
                    <div className="your-portfolio-stocks">
                        {yourStocks.map((stock) => (
                            <TransactionCard
                                key={stock.id}
                                stock={stock}
                                handleBuy={handleBuy}
                                handleSell={handleSell}
                                location={location.state}
                            />
                        ))}
                        {selectedStock && showModal && (
                            <ModalTransactionBuy
                                message={`Are you sure you want to ${
                                    transactionData.type_of_transaction
                                } ${selectedAmmount} stocks of ${selectedStock} at ${Number(
                                    transactionPrice.price
                                ).toFixed(2)}?`}
                                handleConfirm={handleConfirm}
                                handleCancel={handleCancel}
                                showModal={showModal}
                                centered
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
