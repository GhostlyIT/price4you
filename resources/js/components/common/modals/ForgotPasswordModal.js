import React, {useState} from 'react'
import MyModal from "../modal"
import axios from "axios"
import {showNotification} from "../../../helpers/notifications";

const ForgotPasswordModal = ({isOpen, closeModalFunc, modalTitle}) => {
    const [email, setEmail] = useState(null)

    const handle = () => {
        axios.post('/api/forgot-password' , {
            email: email
        })
        .then(response => {
            showNotification('Смена пароля', 'Ссылка для изменения пароля отправлена на указанную почту.', 'success')
        })
        .catch(error => {
            showNotification('Смена пароля', error.response.data.message, 'danger')
        })
        .then(() => {
            closeModalFunc()
        })
    }

    return(
        <MyModal isOpen={isOpen} closeModal={closeModalFunc} modalTitle={modalTitle}>
            <div className="modal__body">
                <div className="modal__element">
                    <form className="d-flex flex-column mt-3 mb-3">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-3 w-100" type="email" placeholder="Ваш Email" />
                    </form>
                </div>
                <div className="modal__element d-flex justify-content-center">
                    <button onClick={() => handle()} className="main-btn mr-4">Изменить пароль</button>
                    <button onClick={() => closeModalFunc()} className="danger-btn">Отмена</button>
                </div>
            </div>
        </MyModal>
    )
}

export default ForgotPasswordModal
