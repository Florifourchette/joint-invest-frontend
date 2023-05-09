import React, { useState } from "react";

const ModalTransaction = ({
  message,
  handleConfirm,
  handleCancel,
  showModal,
}) => {
  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header"></div>
              <h3>Confirmation</h3>
              <div id="modal-body">
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
                  onClick={handleConfirm}
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

export default ModalTransaction;
