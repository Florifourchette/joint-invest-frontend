import React, { useState } from 'react';

const ModalConfirmation = ({
  message,
  handleProposalConfirmation,
  handleCancel,
  showProposalModal,
}) => {
  return (
    <>
      {showProposalModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Confirmation</h3>
                <p>{message}</p>
              </div>

              <div className="modal-footer" id="modalFooter">
                <button
                  onClick={handleCancel}
                  className="hex-button-transactions"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProposalConfirmation}
                  className="hex-button-transactions"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalConfirmation;
