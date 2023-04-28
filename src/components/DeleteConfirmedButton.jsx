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
  setButtonStatus,
  buttonStatus,
}) => {
  const handleStatus = (
    portfolio_id,
    user_id,
    currentStatus,
    buttonStatus
  ) => {
    setPortfolioStatus(
      portfolio_id,
      user_id,
      currentStatus,
      buttonStatus
    );
    setPortfolioStatusUpdated((prev) => !prev);
  };

  return (
    <div>
      {/* current status 'activated' */}
      {data.portfolio_status === 'activated' ? (
        <div>
          <button
            className="to-portfolio-btn"
            onClick={() =>
              Navigate(`/portfolio/${data.portfolio_id}`)
            }
          >
            <IoIosArrowDroprightCircle className="to-portfolio-icon" />{' '}
          </button>
          <button
            onClick={(e) => {
              // e.preventDefault();
              setButtonStatus('deletion_requested');
              return handleStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                buttonStatus
              );
            }}
          >
            <i class="trash alternate icon"></i>
          </button>
        </div>
      ) : (
        <></>
      )}

      {/* current status 'pending_deletion' */}
      {data.portfolio_status === 'pending_activation' &&
      parseInt(userId) !== data.user_id_request ? (
        <p>
          <button
            onClick={() => {
              setButtonStatus('confirmed');
              return handleStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                buttonStatus
              );
            }}
          >
            <i class="check square icon"></i>
          </button>
          <button
            onClick={() => {
              setButtonStatus('rejected');
              return handleStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                buttonStatus
              );
            }}
          >
            <i class="trash alternate icon"></i>
          </button>
        </p>
      ) : (
        <></>
      )}

      {/* current status 'pending_deletion' */}
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) !== data.user_id_request ? (
        <p>
          <button
            onClick={() => {
              setButtonStatus('confirmed');

              return handleStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                buttonStatus
              );
            }}
          >
            <i class="check square icon"></i>
          </button>
          <button
            onClick={() => {
              setButtonStatus('rejected');
              return handleStatus(
                data.portfolio_id,
                userId,
                data.portfolio_status,
                buttonStatus
              );
            }}
          >
            <i class="trash alternate icon"></i>
          </button>
        </p>
      ) : (
        <></>
      )}

      {/* Status update to client */}
      {(data.portfolio_status === 'pending_activation' ||
        data.portfolio_status === 'pending_deletion') &&
      parseInt(userId) === data.user_id_request ? (
        <p>Waiting for {data.friend_username}'s confirmation</p>
      ) : (
        <></>
      )}
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) !== data.user_id_request ? (
        <p>
          {data.friend_username} would like to delete this portfolio.
          You would receive {portfolioTotals[data.portfolio_id] / 2}
        </p>
      ) : (
        <></>
      )}
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          You would like to delete this portfolio. You would receive{' '}
          {portfolioTotals[data.portfolio_id] / 2}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DeleteConfirmedButton;
