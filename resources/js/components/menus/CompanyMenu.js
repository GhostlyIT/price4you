import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import authAction from "../../store/actions/authAction";
import exitAction from "../../store/actions/exitAction";
import updateAction from "../../store/actions/updateAction";
import {connect} from "react-redux";
import axios from "axios";

const CompanyMenu = props => {
    const [unreadMessagesAmount, setUnreadMessagesAmount] = useState(0),
        [acceptedResponsesAmount, setAcceptedResponsesAmount] = useState(0)


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
        axios.get('/api/response/accepted/amount', {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
        .then(response => {
            setAcceptedResponsesAmount(response.data.responses_amount)
        })
        .catch(error => {
            console.log(error.response.data.message)
        })
    }, [props.updateVal])


    const changeLink = (e) => {
        props.updateComponent()
        $('.sideblock-link').removeClass('active')
        e.currentTarget.classList.add('active')
        props.isMobile && props.closeMenuFunc()
    }

    return (
        <div className="user-sideblock__links d-flex flex-column justify-content-between">
            <Link onClick={e => changeLink(e)} className="sideblock-link" to="/company/requests">Запросы</Link>
            <Link onClick={e => changeLink(e)} className="sideblock-link" to="/company/responses">
                Отклики
                {acceptedResponsesAmount > 0 &&
                    <span className="amount-badge font-weight-bold ml-2">
                        <span>{acceptedResponsesAmount}</span>
                    </span>
                }
            </Link>
            <Link onClick={e => changeLink(e)} className="sideblock-link" to="/company/messages">
                Сообщения
                {unreadMessagesAmount > 0 &&
                    <span className="amount-badge font-weight-bold ml-2">
                        <span>{unreadMessagesAmount}</span>
                    </span>
                }
            </Link>
            <Link onClick={e => changeLink(e)} className="sideblock-link" to="/company/info">Данные компании</Link>
            <Link onClick={e => changeLink(e)} className="sideblock-link" to="/company/settings">Настройки</Link>
            <Link onClick={e => changeLink(e)} className="sideblock-link" to="/faq/how-works">Как работает сервис</Link>
            <button onClick={() => props.exit()} type="button">Выйти</button>
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

export default connect(mapStateToProps, mapDispatchProps)(CompanyMenu)
