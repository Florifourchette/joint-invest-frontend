import { useState } from 'react';
import React from 'react';
import {
  IoIosTrash,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { FaCheckSquare, FaArrowCircleRight } from 'react-icons/fa';
import { setPortfolioStatus } from '../../utils/PortfolioDeletion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DeleteConfirmedButton = ({
  data,
  userId,
  portfolioTotals,
  setPortfolioStatusUpdated,
  portfolioStatusUpdated,
  setNewData,
  Navigate,
  wallet,
  prices,
  PortfolioProfitLoss,
}) => {
  const portfolioTotal = portfolioTotals[data.portfolio_id];

  return (
    <div className="dashboard_buttons d-flex align-items-center">
      {/* current status 'activated' */}
      {data.portfolio_status === 'activated' ? (
        <>
          <button
            className="hex-button-default"
            onClick={() => {
              setPortfolioStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                'deletion_requested',
                setNewData
              );
              setPortfolioStatusUpdated((prev) => !prev);
            }}
          >
            {/* <i
              class="trash alternate icon rejection_button"
            ></i> */}
            <div className="rejection_button">
              <i className="status_icons">
                <IoIosTrash size={25} />
              </i>
            </div>
          </button>
          <button
            className="hex-button-default"
            //Navigating and passing the current prices to the portfolio page
            onClick={() => {
              // Filter the wallet for the stocks in the current portfolio
              const filteredWallet = wallet.filter(
                (stock) => stock.portfolio_id === data.portfolio_id
              );

              // Filter the prices for the stocks in the current portfolio
              const filteredPrices = {};
              filteredWallet.forEach((stock) => {
                if (prices[stock.company_id]) {
                  filteredPrices[stock.company_id] =
                    prices[stock.company_id].price;
                }
              });

              // Filter the number of shares for the stocks in the current portfolio
              const filteredShares = {};
              wallet.forEach((stock) => {
                if (filteredShares[stock.portfolio_id]) {
                  filteredShares[stock.portfolio_id][
                    stock.company_id
                  ] = stock.number_of_shares;
                } else {
                  filteredShares[stock.portfolio_id] = {
                    [stock.company_id]: stock.number_of_shares,
                  };
                }
              });

              // Pass the filtered data to the next page
              Navigate(`/portfolio/${data.portfolio_id}`, {
                state: {
                  availableAmount: data.available_amount,
                  prices: filteredPrices,
                  investedAmount: data.invested_amount,
                  userId: userId,
                  number_of_shares: filteredShares[data.portfolio_id],
                  friend: data.friend_username,
                  profitLoss:
                    portfolioTotals[data.portfolio_id] -
                    data.invested_amount,
                },
              });
            }}
          >
            <FaArrowCircleRight
              className="to-portfolio-icon"
              style={{ fontSize: '1.5em' }}
            />{' '}
          </button>
        </>
      ) : (
        <></>
      )}

      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) === data.user_id_request ? (
        <>
          <button
            className="hex-button-default"
            onClick={() => {
              setPortfolioStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                'rejected',
                setNewData
              );
            }}
          >
            Cancel
          </button>
          <button
            className="hex-button-default"
            //Navigating and passing the current prices to the portfolio page
            onClick={() => {
              // Filter the wallet for the stocks in the current portfolio
              const filteredWallet = wallet.filter(
                (stock) => stock.portfolio_id === data.portfolio_id
              );

              // Filter the prices for the stocks in the current portfolio
              const filteredPrices = {};
              filteredWallet.forEach((stock) => {
                if (prices[stock.company_id]) {
                  filteredPrices[stock.company_id] =
                    prices[stock.company_id].price;
                }
              });

              // Filter the number of shares for the stocks in the current portfolio
              const filteredShares = {};
              wallet.forEach((stock) => {
                if (filteredShares[stock.portfolio_id]) {
                  filteredShares[stock.portfolio_id][
                    stock.company_id
                  ] = stock.number_of_shares;
                } else {
                  filteredShares[stock.portfolio_id] = {
                    [stock.company_id]: stock.number_of_shares,
                  };
                }
              });

              // Pass the filtered data to the next page
              Navigate(`/portfolio/${data.portfolio_id}`, {
                state: {
                  prices: filteredPrices,
                  userId: userId,
                  number_of_shares: filteredShares[data.portfolio_id],
                  friend: data.friend_username,
                  portfolioProfitLoss: PortfolioProfitLoss,
                  investedAmount: data.invested_amount,
                  portfolioTotals: portfolioTotals,
                },
              });
            }}
          >
            <FaArrowCircleRight
              className="to-portfolio-icon"
              style={{ fontSize: '1.5em' }}
            />{' '}
          </button>
        </>
      ) : (
        <></>
      )}

      {/* current status 'pending_deletion' */}
      {data.portfolio_status === 'pending_activation' &&
      parseInt(userId) !== data.user_id_request ? (
        <>
          <button
            className="hex-button-default"
            onClick={() => {
              setPortfolioStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                'confirmed',
                setNewData
              );
              setPortfolioStatusUpdated((prev) => !prev);
            }}
          >
            <div className="confirmation_button">
              <i className="status_icons">
                <FaCheckSquare
                  size={21}
                  style={{ color: '#FFF3BE' }}
                />
              </i>
            </div>
          </button>
          <button
            className="hex-button-default"
            onClick={() => {
              setPortfolioStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                'rejected',
                setNewData
              );
              setPortfolioStatusUpdated((prev) => !prev);
            }}
          >
            {/* <i
              class="trash alternate icon rejection_button"
            ></i> */}
            <div className="rejection_button">
              <i className="status_icons">
                <IoIosTrash size={30} />
              </i>
            </div>
          </button>
        </>
      ) : (
        <></>
      )}

      {/* current status 'pending_deletion' */}
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) !== data.user_id_request ? (
        <>
          <button
            className="hex-button-default"
            onClick={() => {
              setPortfolioStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                'rejected',
                setNewData
              );
              setPortfolioStatusUpdated((prev) => !prev);
            }}
          >
            reject
          </button>
          <button
            className="hex-button-default"
            onClick={() => {
              setPortfolioStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                'confirmed',
                setNewData
              );
              setPortfolioStatusUpdated((prev) => !prev);
            }}
          >
            confirm
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DeleteConfirmedButton;
