import React, {useState, useEffect} from 'react'
import axios from "axios"
import {connect} from "react-redux";

const ChatsList = ({token, userData, activeChat, setActiveChat, updateVal}) => {
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
    }, [updateVal])

    if (chats.length > 0) {
        return chats.map(chat => {
            const messagesCount = chat.messages_count
            let opponent = chat.user1.id == userData.id ? chat.user2 : chat.user1
            let recipientId = opponent.id
            let avatar = opponent.avatar

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
                    {avatar == null
                        ? <div className="avatar avatar--small mr-3"></div>
                        : <div className="avatar avatar--small mr-3" style={{backgroundImage: `url(${avatar})`}}></div>
                    }
                    <div className="chat__opponent_main d-flex flex-column">
                        <div className="chat__opponent_name d-flex align-items-center position-relative">
                            <span>{opponent.name} {opponent.surname}</span>

                            {messagesCount > 0 &&
                            <span className="amount-badge font-weight-bold ml-2">
                                <span>{messagesCount}</span>
                            </span>
                            }

                            {/*<span onClick={() => console.log('ok')} className="position-absolute chat__delete_btn"></span>*/}
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
        userData: store.authReducer.userData,
        updateVal: store.updateReducer.counter
    };
}

export default connect(mapStateToProps)(ChatsList)
