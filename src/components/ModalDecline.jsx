import React, { useState } from "react";

const ModalConfirmation = ({
  message,
  handleProposalDecline,
  handleCancel,
  showDeclineModal,
}) => {
  return (
    <>
      {showDeclineModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Confirmation</h3>

                <div className="modal-body">
                  <p>{message}</p>
                </div>
                <div className="modal-footer" id="modalFooter">
                  <button
                    onClick={handleProposalDecline}
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
        </div>
      )}
    </>
  );
};

export default ModalConfirmation;
