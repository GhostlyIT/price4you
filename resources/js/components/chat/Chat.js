import React, {useState, useEffect, useRef} from 'react'
import axios from "axios"
import ChatsList from "./chat-components/ChatsList"
import {connect} from "react-redux"
import Messages from "./chat-components/Messages"
import {sendMessage} from "../../helpers/sendMessage"
import {showNotification} from "../../helpers/notifications"

const Chat = ({token}) => {
    const [activeChat, setActiveChat] = useState(null),
        [messages, setMessages] = useState([]),
        [currentMessage, setCurrentMessage] = useState(''),
        [recipientId, setRecipientId] = useState(null)

    const messagesElement = useRef(null)
    const input = useRef(null)

    const handleSend = () => {
        if (sendMessage(currentMessage, recipientId, token)) {
            setCurrentMessage('')
            input.current.value = ''
            getMessages()
        } else {
            showNotification('Сообщение', 'Произошла ошибка при отправке сообщения', 'danger')
        }
    }

    const getMessages = () => {
        axios.get('/api/message/all?chat_id=' + activeChat, {
            headers: {'Authorization': 'Bearer ' + token}
        })
            .then(response => {
                setMessages(response.data.messages)
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
    }

    useEffect(() => {
        if (activeChat != null) {
            getMessages()
        }
    }, [activeChat])

    useEffect(() => {
        if (messagesElement.current != null) {
            messagesElement.current.scrollIntoView()
        }
    }, [messages])



    return(
        <div className="chat row m-0 w-100">
            <div className="chat__opponents col-3 p-0 d-flex flex-column">
                <ChatsList activeChat={activeChat}
                    setActiveChat={(chatId, recipientId) => {
                        setActiveChat(chatId)
                        setRecipientId(recipientId)
                    }}
                />
            </div>

            <div className="col-9">
                <div className="chat__chat">
                    <Messages messages={messages} />
                    <div style={{ float:"left", clear: "both" }}
                         ref={messagesElement}>
                    </div>
                </div>
                {activeChat != null &&
                    <div className="chat__input d-flex flex-column">
                        <textarea ref={input} onChange={e => setCurrentMessage(e.target.value)} placeholder="Ваше сообщение..." rows="5"></textarea>
                        <button onClick={() => handleSend()} type="button" className="main-btn mb-3 mt-3 w-50" disabled={currentMessage.length === 0}>Отправить</button>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
        userData: store.authReducer.userData
    };
}

export default connect(mapStateToProps)(Chat)
