import React from "react";

const statusMessages = ({ data, userId, portfolioTotals }) => {
  console.log(data);
  return (
    <div className="message_container">
      {/* Status update to client */}

      {/* pending_deletion for friend */}
      {data.portfolio_status === "pending_deletion" &&
      parseInt(userId) !== data.user_id_request ? (
        <p className="message">
          Deletion request from <span>{data.friend_username}</span>. Estimated
          value: <span>{portfolioTotals[data.portfolio_id] / 2}</span>
        </p>
      ) : (
        <></>
      )}
      {/* pending_deletion for user */}
      {data.portfolio_status === "pending_deletion" &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          Waiting for <span>{data.friend_username}</span> to confirm deletion.{" "}
          Estimated value: <span>{portfolioTotals[data.portfolio_id] / 2}</span>
        </p>
      ) : (
        <></>
      )}

      {/* pending_activation for friend */}
      {data.portfolio_status === "pending_activation" &&
      parseInt(userId) !== data.user_id_request ? (
        <p>
          <span>{data.friend_username}</span> invited you to join a portfolio.
        </p>
      ) : (
        <></>
      )}

      {/* pending_activation for user */}
      {data.portfolio_status === "pending_activation" &&
      parseInt(userId) === data.user_id_request ? (
        <p>
          Waiting for <span>{data.friend_username}</span> to confirm this
          portfolio.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default statusMessages;
