import React from 'react'
import MyModal from "../modal"

const ConfirmModal = ({isOpen, closeModalFunc, modalTitle, confirmFunc, children}) => {
    const handle = () => {
        confirmFunc()
        closeModalFunc()
    }

    return(
        <MyModal isOpen={isOpen} closeModal={closeModalFunc} modalTitle={modalTitle}>
            <div className="modal__body">
                <div className="modal__element">
                    {children}
                </div>
                <div className="modal__element d-flex justify-content-center">
                    <button onClick={() => handle()} className="main-btn mr-4">Подтвердить</button>
                    <button onClick={() => closeModalFunc()} className="danger-btn">Отмена</button>
                </div>
            </div>
        </MyModal>
    )
}

export default ConfirmModal
