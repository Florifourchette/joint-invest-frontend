import React, { useState } from "react";

const ModalConfirmation= ({ message, handleProposalConfirmation, handleCancel,showProposalModal }) => {
    


    return (
        <>
            {showProposalModal && (
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
                                <button onClick={handleProposalConfirmation}>Purchase</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalConfirmation;
