import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'

const SideBlock = (props) => {
    return (
        <div className="d-flex flex-column auth-sideblock justify-content-between">
            <div className="d-flex flex-column auth-nav">
                <Link to="/login">Войти</Link>
                <Link to="/register">Регистрация</Link>
                <Link to="/register-company">Регистрация компании</Link>
            </div>
            <div className="d-flex flex-column auth-faq">
                <Link to="/">EcoPlant Агро</Link>
                <Link to="/">EcoPlant | Price4you</Link>
                <Link to="/">Как работает сервис</Link>
                <Link to="/">Частые вопросы</Link>
            </div>
        </div>
    )
}

export default SideBlock;
