import React from 'react'
import MyModal from "../modal";

const SendMessageModal = ({isOpen, closeModalFunc, modalTitle}) => {
    return (
        <MyModal isOpen={isOpen} closeModal={closeModalFunc} modalTitle={modalTitle}>
                <textarea className="form-control d-inline-block mb-4" rows="5"></textarea>
            <button className="main-btn">Отправить сообщение</button>
        </MyModal>
    )
}

export default SendMessageModal
