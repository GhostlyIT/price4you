import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from "redux";
import authAction from "../../store/actions/authAction";
import exitAction from "../../store/actions/exitAction";
import {connect} from "react-redux";
import axios from "axios";
import updateAction from "../../store/actions/updateAction";

const UserSideBlock = (props) => {
    const [activeLink, setActiveLink] = useState(2),
        [responsesAmount, setResponsesAmount] = useState(0),
        [unreadMessagesAmount, setUnreadMessagesAmount] = useState(0)

    useEffect(() => {
      axios.get('/api/response/count/all', {
          headers: {'Authorization': 'Bearer ' + props.token}
      })
          .then(response => {
              setResponsesAmount(response.data.responses_count)
          })
          .catch(error => {
              console.log(error.response.data.message)
          })
    }, [props.updateVal])

    useEffect(() => {
        axios.get('/api/message/count/all', {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then(response => {
                setUnreadMessagesAmount(response.data.unread_messages_count)
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
    }, [props.updateVal])

    useEffect(() => {
        props.updateComponent()
    }, [activeLink])

    return(
        <div className="d-flex flex-column user-sideblock justify-content-between">
            <div className="avatar">

            </div>

            <h3 className="user-name">{props.userData.name} {props.userData.surname}</h3>

            <div className="user-sideblock__links d-flex flex-column justify-content-between">
                <Link onClick={() => setActiveLink('1')} className={window.location.pathname === '/user/add-request' ? 'active' : null} to="/user/add-request">Добавить запрос</Link>
                <Link onClick={() => setActiveLink('2')} className={window.location.pathname === '/user/requests' || activeLink === 2 ? 'active' : null} to="/user/requests">Мои запросы</Link>
                <Link onClick={() => setActiveLink('3')} className={`d-flex ${window.location.pathname === '/user/offers' ? 'active' : null}`} to="/user/offers">
                    Предложения
                    {responsesAmount > 0 &&
                        <span className="amount-badge font-weight-bold ml-2">
                            <span>{responsesAmount}</span>
                        </span>
                    }
                </Link>
                <Link onClick={() => setActiveLink('4')} className={`d-flex ${window.location.pathname === '/user/messages' ? 'active' : null}`} to="/user/messages">
                    Сообщения
                    {unreadMessagesAmount > 0 &&
                        <span className="amount-badge font-weight-bold ml-2">
                            <span>{unreadMessagesAmount}</span>
                        </span>
                    }
                </Link>
                <Link onClick={() => setActiveLink('5')} className={window.location.pathname === '/user/settings' ? 'active' : null} to="/user/settings">Настройки</Link>
                <Link onClick={() => setActiveLink('6')} className={window.location.pathname === '/faq/how-works' ? 'active' : null} to="/faq/how-works">Как работает сервис</Link>
                <button onClick={() => props.exit()} type="button">Выйти</button>
            </div>
        </div>
    )
}


const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
        userData: store.authReducer.userData,
        updateVal: store.updateReducer.counter
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch),
        exit: bindActionCreators(exitAction, dispatch),
        updateComponent: bindActionCreators(updateAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(UserSideBlock)
