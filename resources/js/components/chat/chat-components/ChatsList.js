import React, {useState, useEffect} from 'react'
import axios from "axios"
import {bindActionCreators} from "redux";
import authAction from "../../../store/actions/authAction";
import exitAction from "../../../store/actions/exitAction";
import {connect} from "react-redux";

const ChatsList = ({token, userData, activeChat, setActiveChat}) => {
    const maxLetters = 15
    const [chats, setChats] = useState([])

    useEffect(() => {
      axios.get('/api/message/chats', {
          headers: {'Authorization': 'Bearer ' + token}
      })
          .then(response => {
              setChats(response.data.chats)
          })
          .catch(error => {
              console.log(error.response.data.message)
          })
    }, [])

    if (chats.length > 0) {
        return chats.map(chat => {
            const messagesCount = chat.messages_count
            let opponent = chat.user1.id == userData.id ? chat.user2 : chat.user1
            let recipientId = opponent.id

            let message = chat.messages[0].message.slice(0, maxLetters)
            if (message.length < chat.messages[0].message.length) {
                message += '...'
            }

            if (opponent.account_type === 'company') {
                opponent = opponent.company
                opponent.surname = ''
            }

            return(
                <span onClick={() => setActiveChat(chat.id, recipientId)} key={chat.id} className={`chat__opponent w-100 d-flex align-items-center ${activeChat == chat.id && 'active'} ${messagesCount > 0 && 'has-messages'}`}>
                    <div className="chat__opponent_avatar" style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'grey',
                        marginRight: '20px'
                    }}></div>
                    <div className="chat__opponent_main d-flex flex-column">
                        <div className="chat__opponent_name d-flex align-items-center">
                            <span>{opponent.name} {opponent.surname}</span>
                            {messagesCount > 0 &&
                            <span className="amount-badge font-weight-bold ml-2">
                                <span>{messagesCount}</span>
                            </span>
                            }
                        </div>
                        <div className="chat__opponent_last_message">
                            <span>{chat.messages[0].from == userData.id ? 'Вы:' : ''} {message}</span>
                        </div>
                    </div>
                </span>
            )
        })
    }

    return(
        <h5>Переписок пока нет</h5>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
        userData: store.authReducer.userData
    };
}

export default connect(mapStateToProps)(ChatsList)
