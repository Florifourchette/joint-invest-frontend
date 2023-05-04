import React, { useEffect, useState } from "react";
import {
  getTransactionsData,
  writeTransaction,
  confirmOrCancelTransaction,
} from "../../utils/APIcalls";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LogIn from "./LogIn";
import { Message } from "semantic-ui-react";
import Navbar from "../components/Navbar";
import { transaction } from "../../utils/TransactionOperations";
import ReactModal from "react-modal";
import ModalTransactionBuy from "../components/ModalTransaction";
import ModalConfirmation from "../components/ModalConfirmation";
import ModalDecline from "../components/ModalDecline";
import ModalCancellation from "../components/ModalCancellation";
import TransactionCard from "../components/TransactionCard";
import TransactionCardPending from "../components/TransactionCardPending";
import TransactionCardSearch from "../components/TransactionCardSearch";
import StockSearchBar from "../components/StockSearch";
import { createApiUrl } from "../../utils/CreateAPIUrl";
import { BiArrowBack } from "react-icons/bi";

export default function Transactions() {
  const { isAuthenticated } = useAuth();
  let { portfolioId } = useParams();

  const location = useLocation();

  console.log(
    ` location at transactions ${JSON.stringify(location.state)}`
  );

  //STATES
  const [yourStocks, setYourStocks] = useState([]);
  const [selectedAmmount, setSelectedAmmount] = useState(1);
  const [transactionPrice, setTransactionPrice] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedStockName, setSelectedStockName] = useState("");
  const [transactionData, setTransactionData] = useState([{}]);
  const [confirmOrDeclince, setConfirmOrDeclince] = useState("");
  const [transactionId, setTransactionId] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionPrice, setSelectedOptionPrice] = useState([]);
  const Navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    Navigate(-1);
  };

  //Extract search terms for API calls
  const [substring1, substring2] = selectedOption.split("(");
  const companyId = substring2?.slice(0, -1);
  const companyName = substring1;
  console.log("companyId:", companyId);

  //Use Effects
  useEffect(() => {
    getTransactionsData(portfolioId)
      .then((data) => {
        console.log(data);
        setYourStocks(data);
      })
      .catch((error) => console.error(error));
  }, [portfolioId]);

  console.log("portfolioId:", portfolioId);
  console.log('your strocks' , yourStocks)
  useEffect(() => {
    if (selectedOption !== "") {
      console.log("iside the effect", companyId);
      const apiUrl = createApiUrl(companyId);
      console.log(apiUrl);
      const apiCall = async () => {
        try {
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              setSelectedOptionPrice(Number(data.price).toFixed(2));
              console.log("price", selectedOptionPrice);
            });
        } catch (error) {
          console.log(error);
        }
      };
      apiCall();
    }
  }, [selectedOption, companyId]);

  console.log(yourStocks);

  //buy - sell Transactions
  const handleBuy = (companyId, companyName, counter) => {
    setSelectedAmmount(counter);
    transaction({ companyId, counter, companyName }, (data) => {
      setTransactionPrice(data);
      setSelectedStock(companyId);
      setTransactionData(() => ({
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
  const handleSell = (companyId, companyName, counter) => {
    setSelectedAmmount(counter);
    transaction({ companyId, counter, companyName }, (data) => {
      setTransactionPrice(data);
      setSelectedStock(companyId);
      setTransactionData(() => ({
        number_of_shares: counter.toString(),
        company_id: companyId,
        type_of_transaction: "Sell",
        company_name: companyName,
        price_of_share: data.price,
        user_id: location.state.userId,
      }));

      setShowModal(true);
    });
    setShowModal(true);
  };

  // proposal confirmation handlers

  const handlePurchase = (
    companyId,
    companyName,
    transactionId,
    number_of_shares
  ) => {
    setConfirmOrDeclince("confirm");
    setSelectedAmmount(number_of_shares);
    setSelectedStockName(companyName);
    setTransactionId(transactionId);
    transaction({ companyId, companyName }, (data) => {
      setTransactionPrice(data);
      setSelectedStock(companyId);
      setTransactionData(() => ({
        transaction_status: "confirmed",
        current_price_of_share: data.price,
      }));
    });
    setShowProposalModal(true);
  };

  const handleDecline = (
    companyId,
    companyName,
    transactionId,
    number_of_shares
  ) => {
    setConfirmOrDeclince("decline");
    setSelectedAmmount(number_of_shares);
    setSelectedStockName(companyName);
    setSelectedStock(companyId);
    setTransactionId(transactionId);
    transaction({ companyId, companyName }, (data) => {
      setTransactionPrice(data);
      setSelectedStock(companyId);
      setTransactionData(() => ({
        transaction_status: "canceled",
      }));
    });
    setShowDeclineModal(true);
  };
  const handleCancelRequest = (transactionId) => {
    setTransactionId(transactionId);
    setTransactionData(() => ({
      transaction_status: "canceled",
    }));
    setShowCancellationModal(true);
  };

  //Modal Controlls
  const handleConfirm = () => {
    setShowModal(false);
    writeTransaction(portfolioId, transactionData);
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowProposalModal(false);
    setShowDeclineModal(false);
    setShowCancellationModal(false);
  };

  const handleProposalConfirmation = () => {
    confirmOrCancelTransaction(portfolioId, transactionId, transactionData);
    setShowProposalModal(false);
  };
  const handleProposalDecline = () => {
    confirmOrCancelTransaction(portfolioId, transactionId, transactionData);
    setShowProposalModal(false);
  };
  const handleProposalCancellation = () => {
    confirmOrCancelTransaction(portfolioId, transactionId, transactionData);
    setShowCancellationModal(false);
  };
  return isAuthenticated ? (
    <div>
      <div style={{ width: "450px" }}>
        <BiArrowBack
          style={{ fontSize: "2rem", position: "absolute", marginTop: "20px" }}
          onClick={handleBack}
        />
      </div>
      <div className="transactions-title">
        <h1>Buy/Sell</h1>
        <p>Once both partners have confirmed we will process your request</p>
      </div>
      <div className="SearchBar">
        <StockSearchBar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className="transactions-container">
        <div className="your-stocks">
          <h2>Your Stocks</h2>
          <div className="your-portfolio-stocks">
            {selectedOption !== "" && (
              <TransactionCardSearch
                selectedOption={selectedOption}
                handleBuy={handleBuy}
                companyId={companyId}
                companyName={companyName}
                selectedOptionPrice={selectedOptionPrice}
              />
            )}
            {selectedOption === "" && yourStocks.length > 0 && (
              <>
                {yourStocks.map((stock, index) => {
                  if (stock.status === "pending") {
                    return (
                      <TransactionCardPending
                        key={stock.id}
                        stock={stock}
                        location={location.state}
                        handlePurchase={handlePurchase}
                        handleDecline={handleDecline}
                        handleCancelRequest={handleCancelRequest}
                      />
                    );
                  } else {
                    return (
                      <TransactionCard
                        key={stock.id}
                        stock={stock}
                        handleBuy={handleBuy}
                        handleSell={handleSell}
                        location={location.state}
                      />
                    );
                  }
                })}
              </>
            )}
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
            {selectedStock && showProposalModal && (
              <ModalConfirmation
                message={`Are you sure you want to ${confirmOrDeclince} the purchase of ${selectedAmmount} stocks of ${selectedStockName}(${selectedStock}) at ${Number(
                  transactionPrice.price
                ).toFixed(2)}?`}
                handleProposalConfirmation={handleProposalConfirmation}
                handleCancel={handleCancel}
                showProposalModal={showProposalModal}
                centered
              />
            )}
            {selectedStock && showDeclineModal && (
              <ModalDecline
                message={`Are you sure you want to ${confirmOrDeclince} the purchase of ${selectedAmmount} stocks of ${selectedStockName} (${selectedStock})?`}
                handleProposalDecline={handleProposalDecline}
                handleCancel={handleCancel}
                showDeclineModal={showDeclineModal}
                centered
              />
            )}
            {showCancellationModal && (
              <ModalCancellation
                message={`Are you sure you want to cancel your purchase request?`}
                handleProposalCancellation={handleProposalCancellation}
                handleCancel={handleCancel}
                showCancellationModal={showCancellationModal}
                centered
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
      <div>
          <div className="d-flex justify-content-center">
              <Message style={{ color: "red" }}>
                  You are not logged in, please login!
              </Message>
          </div>
          <LogIn />
      </div>
  );
}
