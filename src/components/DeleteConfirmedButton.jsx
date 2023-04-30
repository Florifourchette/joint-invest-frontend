import { useState } from 'react';
import React from 'react';
import {
  IoIosArrowDroprightCircle,
  IoIosContacts,
  IoIosAdd,
} from 'react-icons/io';
import { setPortfolioStatus } from '../../utils/PortfolioDeletion';

const DeleteConfirmedButton = ({
  data,
  userId,
  portfolioTotals,
  setPortfolioStatusUpdated,
  portfolioStatusUpdated,
  setNewData,
}) => {
  console.log(data);

  return (
    <>
      {/* current status 'activated' */}
      {data.portfolio_status === 'activated' ? (
        <div>
          <button
            className="confirmation_button"
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
            <i
              class="trash alternate icon"
              className="rejection_button"
            ></i>
          </button>
        </div>
      ) : (
        <></>
      )}

      {/* current status 'pending_deletion' */}
      {data.portfolio_status === 'pending_activation' &&
      parseInt(userId) !== data.user_id_request ? (
        <>
          <button
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
            <i class="check square icon"></i>
          </button>
          <button
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
            <i class="trash alternate icon"></i>
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
            <i class="check square icon"></i>
          </button>
          <button
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
            <i class="trash alternate icon"></i>
          </button>
        </>
      ) : (
        <></>
      )}

      {/* Status update to client */}
      {(data.portfolio_status === 'pending_activation' ||
        data.portfolio_status === 'pending_deletion') &&
      parseInt(userId) === data.user_id_request ? (
        <div>
          <p>Waiting for {data.friend_username}'s confirmation</p>
        </div>
      ) : (
        <></>
      )}
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) !== data.user_id_request ? (
        <div>
          <p>
            {data.friend_username} would like to delete this
            portfolio. You would receive{' '}
            {portfolioTotals[data.portfolio_id] / 2}
          </p>
        </div>
      ) : (
        <></>
      )}
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) === data.user_id_request ? (
        <div>
          <p>
            You would like to delete this portfolio. You would receive{' '}
            {portfolioTotals[data.portfolio_id] / 2}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteConfirmedButton;
