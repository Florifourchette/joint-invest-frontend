import React from 'react';

const statusMessages = ({ data, userId, portfolioTotals }) => {
  console.log(data);
  return (
    <div className="message_container">
      {/* Status update to client */}
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) !== data.user_id_request ? (
        <p className="message">
          Deletion request from: <span>{data.friend_username}</span>.{' '}
          <br />
          Estimation value for you:{' '}
          <span>{portfolioTotals[data.portfolio_id] / 2}</span>
        </p>
      ) : (
        <></>
      )}
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          Portfolio deletion requested. <br />
          Estimation value for you:{' '}
          <span>{portfolioTotals[data.portfolio_id] / 2}</span>
        </p>
      ) : (
        <></>
      )}
      {(data.portfolio_status === 'pending_activation' ||
        data.portfolio_status === 'pending_deletion') &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          Waiting for answer from:{' '}
          <span className="important_info">
            {data.friend_username}
          </span>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default statusMessages;
