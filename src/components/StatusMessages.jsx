import React from "react";

const statusMessages = ({ data, userId, portfolioTotals }) => {
  console.log(data);
  return (
    <div className="message_container">
      {/* Status update to client */}

      {/* pending_deletion for friend */}
<<<<<<< HEAD
      {data.portfolio_status === "pending_deletion" &&
=======
      {data.portfolio_status === 'pending_deletion' &&
>>>>>>> dev
      parseInt(userId) !== data.user_id_request ? (
        <p className="message">
          Deletion request from <span>{data.friend_username}</span>.
          <br />
<<<<<<< HEAD
          Estimated value: <span>{portfolioTotals[data.portfolio_id] / 2}</span>
=======
          Estimated value:{' '}
          <span>{portfolioTotals[data.portfolio_id] / 2}</span>
>>>>>>> dev
        </p>
      ) : (
        <></>
      )}
      {/* pending_deletion for user */}
<<<<<<< HEAD
      {data.portfolio_status === "pending_deletion" &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          Waiting for <span>{data.friend_username}</span> to confirm deletion.{" "}
          <br />
          Estimated value: <span>{portfolioTotals[data.portfolio_id] / 2}</span>
=======
      {data.portfolio_status === 'pending_deletion' &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          Waiting for <span>{data.friend_username}</span> to confirm
          deletion. <br />
          Estimated value:{' '}
          <span>{portfolioTotals[data.portfolio_id] / 2}</span>
>>>>>>> dev
        </p>
      ) : (
        <></>
      )}

      {/* pending_activation for friend */}
<<<<<<< HEAD
      {data.portfolio_status === "pending_activation" &&
      parseInt(userId) !== data.user_id_request ? (
        <p>
          <span>{data.friend_username}</span> invited you to join a portfolio.
=======
      {data.portfolio_status === 'pending_activation' &&
      parseInt(userId) !== data.user_id_request ? (
        <p>
          <span>{data.friend_username}</span> invited you to join a
          portfolio.
>>>>>>> dev
        </p>
      ) : (
        <></>
      )}

      {/* pending_activation for user */}
<<<<<<< HEAD
      {data.portfolio_status === "pending_activation" &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          Waiting for <span>{data.friend_username}</span> to confirm this
          portfolio.
=======
      {data.portfolio_status === 'pending_activation' &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          Waiting for <span>{data.friend_username}</span> to confirm
          this portfolio.
>>>>>>> dev
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default statusMessages;
