import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from "redux";
import authAction from "../../store/actions/authAction";
import exitAction from "../../store/actions/exitAction";
import {connect} from "react-redux";

const CompanySideblock = (props) => {
    const [activeLink, setActiveLink] = useState(1)

    return(
        <div className="d-flex flex-column user-sideblock justify-content-between">
            <div className="avatar">

            </div>

            <h3 className="user-name">{props.userData.name} {props.userData.surname}</h3>

            <div className="user-sideblock__links d-flex flex-column justify-content-between">
                <Link onClick={() => setActiveLink('1')} className={window.location.pathname === '/company/requests' || activeLink === 1 ? 'active' : null} to="/company/requests">Запросы</Link>
                <Link onClick={() => setActiveLink('2')} className={window.location.pathname === '/company/responses' ? 'active' : null} to="/company/responses">Отклики</Link>
                <Link onClick={() => setActiveLink('3')} className={window.location.pathname === '/company/messages' ? 'active' : null} to="/company/messages">Сообщения</Link>
                <Link onClick={() => setActiveLink('4')} className={window.location.pathname === '/company/add-product' ? 'active' : null} to="/company/add-product">Добавить товар</Link>
                <Link onClick={() => setActiveLink('5')} className={window.location.pathname === '/company/employee-info' ? 'active' : null} to="/company/employee-info">Мои данные</Link>
                <Link onClick={() => setActiveLink('6')} className={window.location.pathname === '/company/info' ? 'active' : null} to="/company/info">Данные компании</Link>
                <Link onClick={() => setActiveLink('7')} className={window.location.pathname === '/company/statistic' ? 'active' : null} to="/company/statistic">Настройки</Link>
                <Link onClick={() => setActiveLink('8')} className={window.location.pathname === '/faq/how-works' ? 'active' : null} to="/faq/how-works">Как работает сервис</Link>
                <button onClick={() => props.exit()} type="button">Выйти</button>
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        userData: store.authReducer.userData
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch),
        exit: bindActionCreators(exitAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(CompanySideblock)
