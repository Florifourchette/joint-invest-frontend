import React, { useState } from "react";

const ModalCancellation= ({ message, handleProposalCancellation, handleCancel,showCancellationModal }) => {
    


    return (
        <>
            {showCancellationModal && (
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
                                <button onClick={handleProposalCancellation}>Yes</button>
                                <button onClick={handleCancel}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalCancellation;