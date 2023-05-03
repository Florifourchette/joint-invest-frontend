import React, { useState } from "react";

const ModalConfirmation= ({ message,handleProposalDecline,handleCancel,showDeclineModal }) => {
    


    return (
        <>
            {showDeclineModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Confirmation</h3>
                            </div>
                            <div className="modal-body">
                                <p>{message}</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleProposalDecline}>Yes</button>
                                <button onClick={handleCancel}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalConfirmation;