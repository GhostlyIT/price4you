import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import authAction from "../../store/actions/authAction";
import exitAction from "../../store/actions/exitAction";
import updateAction from "../../store/actions/updateAction";
import {connect} from "react-redux";
import axios from "axios";

const CompanyMenu = props => {
    const [activeLink, setActiveLink] = useState(1),
        [unreadMessagesAmount, setUnreadMessagesAmount] = useState(0)

    useEffect(() => {
        props.updateComponent()
    }, [activeLink])

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

    const changeLink = (linkNumber) => {
        setActiveLink(linkNumber)
        props.isMobile && props.closeMenuFunc()
    }

    return (
        <div className="user-sideblock__links d-flex flex-column justify-content-between">
            <Link onClick={() => changeLink('1')} className={window.location.pathname === '/company/requests' || activeLink === 1 ? 'active' : null} to="/company/requests">Запросы</Link>
            <Link onClick={() => changeLink('2')} className={window.location.pathname === '/company/responses' ? 'active' : null} to="/company/responses">Отклики</Link>
            <Link onClick={() => changeLink('3')} className={`d-flex ${window.location.pathname === '/company/messages' ? 'active' : null}`} to="/company/messages">
                Сообщения
                {unreadMessagesAmount > 0 &&
                    <span className="amount-badge font-weight-bold ml-2">
                        <span>{unreadMessagesAmount}</span>
                    </span>
                }
            </Link>
            {/*<Link onClick={() => changeLink('4')} className={window.location.pathname === '/company/add-product' ? 'active' : null} to="/company/add-product">Добавить товар</Link>*/}
            {/*<Link onClick={() => changeLink('5')} className={window.location.pathname === '/company/employee-info' ? 'active' : null} to="/company/employee-info">Мои данные</Link>*/}
            <Link onClick={() => changeLink('6')} className={window.location.pathname === '/company/info' ? 'active' : null} to="/company/info">Данные компании</Link>
            <Link onClick={() => changeLink('7')} className={window.location.pathname === '/company/settings' ? 'active' : null} to="/company/settings">Настройки</Link>
            <Link onClick={() => changeLink('8')} className={window.location.pathname === '/faq/how-works' ? 'active' : null} to="/faq/how-works">Как работает сервис</Link>
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
