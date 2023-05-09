import React, { useState } from "react";

const ModalCancellation = ({
  message,
  handleProposalCancellation,
  handleCancel,
  showCancellationModal,
}) => {
  return (
    <>
      {showCancellationModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Confirmation</h3>
              </div>
              <div id="modal-body">
                <p>{message}</p>
              </div>
              <div className="modal-footer" id="modalFooter">
                <button
                  onClick={handleProposalCancellation}
                  className="hex-button-transactions"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancel}
                  className="hex-button-transactions"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCancellation;
