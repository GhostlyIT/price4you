import React, {useState} from 'react'
import MyModal from "../modal"
import {sendMessage} from "../../../helpers/sendMessage"
import {connect} from "react-redux"
import {showNotification} from "../../../helpers/notifications"

const SendMessageModal = ({isOpen, closeModalFunc, modalTitle, recipientId, token, theme = null}) => {
    const [message, setMessage] = useState('')

    const handle = () => {
        if (sendMessage(message, recipientId, token, theme) == true) {
            setMessage('')
            closeModalFunc()
            showNotification('Сообщение', 'Сообщение отправлено', 'success')
        } else {
            showNotification('Сообщение', 'Произошла ошибка при отправке сообщения', 'danger')
        }
    }

    return (
        <MyModal isOpen={isOpen} closeModal={closeModalFunc} modalTitle={modalTitle}>
            <textarea onChange={e => setMessage(e.target.value)} className="form-control d-inline-block mb-4" rows="5"></textarea>
            <button onClick={() => handle()} className="main-btn">Отправить сообщение</button>
        </MyModal>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken
    };
}

export default connect(mapStateToProps)(SendMessageModal)
