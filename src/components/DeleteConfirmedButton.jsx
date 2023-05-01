import { useState } from 'react';
import React from 'react';
import {
  IoIosTrash,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { FaCheckSquare } from 'react-icons/fa';
import { setPortfolioStatus } from '../../utils/PortfolioDeletion';

const DeleteConfirmedButton = ({
  data,
  userId,
  portfolioTotals,
  setPortfolioStatusUpdated,
  portfolioStatusUpdated,
  setNewData,
}) => {
  return (
    <div className="dashboard_buttons">
      {/* current status 'activated' */}
      {data.portfolio_status === 'activated' ? (
        <>
          <button
            className="to-portfolio-btn"
            onClick={() =>
              Navigate(`/portfolio/${data.portfolio_id}`)
            }
          >
            <IoIosArrowDroprightCircle className="to-portfolio-icon" />{' '}
          </button>
          <button
            className="button_portfolio_status_change"
            onClick={() => {
              setPortfolioStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                'deletion_requested',
                setNewData
              );
              setPortfolioStatusUpdated((prev) => !prev);
              console.log(portfolioStatusUpdated);
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
      {data.portfolio_status === 'pending_activation' &&
      parseInt(userId) !== data.user_id_request ? (
        <>
          <button
            className="button_portfolio_status_change"
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
                <FaCheckSquare size={30} />
              </i>
            </div>
          </button>
          <button
            className="button_portfolio_status_change"
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
            className="button_portfolio_status_change"
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
                <FaCheckSquare size={30} />
              </i>
            </div>
          </button>
          <button
            className="button_portfolio_status_change"
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
    </div>
  );
};

export default DeleteConfirmedButton;
