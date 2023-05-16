import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Image } from 'semantic-ui-react';
import { getShareNumbers } from '../../utils/APIcalls';

export default function TransactionCard({
  stock,
  handleBuy,
  handleSell,
  location,
  confirmation,
  portfolioId,
  setConfirmation,
}) {
  const { contextStockData } = useAppContext();
  const [logo, setLogo] = useState();
  const [numberofSharesData, setNumberofSharesData] = useState();

  const [counter, setCounter] = useState(1);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  useEffect(() => {
    getShareNumbers(portfolioId)
      .then((data) => {
        console.log(data);
        setNumberofSharesData(data.stocks);
      })
      .catch((error) => console.error(error));
    setConfirmation(false);
  }, []);

  const getNumberOfShares = () => {
    if (numberofSharesData) {
      const company = Object.values(numberofSharesData).find(
        (company) => company.company_id === stock.company_id
      );
      return company ? company.current_number_of_stocks : 0;
    }
    return 0;
  };

  const insertLogo = (stockData, companyId) => {
    const theLogo = stockData.find(
      (alogo) => alogo.companyid == companyId
    );
    console.log(theLogo);
    if (theLogo) {
      return `/company_logos/${theLogo.logo}`;
    }
    return '/company_logos/NO_LOGO.png';
  };

  return getNumberOfShares() > 0 ? (
    <div key={stock.id} className="transactions-card">
      <div className="transactions-left-column">
        <Image
          style={{ height: '40px', width: '40px' }}
          avatar
          src={insertLogo(contextStockData, stock.company_id)}
        />
      </div>
      <div className="transactions-middle-column">
        <div>
          {numberofSharesData && (
            <h6 className="transactions-company">
              {stock.company_id} ({getNumberOfShares()})
            </h6>
          )}
        </div>
        <div className="padding-bottom">
          {Object.keys(location.prices).length !== 0 && (
            <h5 className="transactions-price">
              Price:{' '}
              {Number(location.prices[stock.company_id]).toFixed(2)}
            </h5>
          )}
        </div>
        <div className="stock-counter-transactions-card">
          <button
            onClick={decreaseCounter}
            className="hex-button-small-transaction-card"
          >
            -
          </button>

          <h6>{counter}</h6>

          <button
            onClick={increaseCounter}
            className="hex-button-small-transaction-card"
          >
            +
          </button>
        </div>
      </div>
      <div className="buy-sell-btns">
        <button
          className="transactions_button"
          onClick={() =>
            handleBuy(stock.company_id, stock.company_name, counter)
          }
        >
          Buy
        </button>
        {getNumberOfShares() >= counter ? (
          <button
            className="transactions_button"
            style={{
              backgroundColor: '#84714F',
              backgroundImage: 'none',
            }}
            onClick={() =>
              handleSell(
                stock.company_id,
                stock.company_name,
                counter
              )
            }
          >
            Sell
          </button>
        ) : (
          <button
            className="transactions_button_disabled"
            style={{
              backgroundColor: '#573131',
              backgroundImage: 'none',
            }}
            onClick={() =>
              handleSell(
                stock.company_id,
                stock.company_name,
                counter
              )
            }
            disabled
          >
            Sell
          </button>
        )}
      </div>
    </div>
  ) : (
    <div />
  );
}
