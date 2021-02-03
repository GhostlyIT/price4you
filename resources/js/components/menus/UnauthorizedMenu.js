import React from 'react'
import {Link} from 'react-router-dom'

const UnauthorizedMenu = () => {
    return(
        <div className="d-flex flex-column user-sideblock__links justify-content-between">
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
            <Link to="/register-company">Регистрация компании</Link>
            <Link to="/faq/how-works">Как работает сервис</Link>
            <Link to="/faq">Частые вопросы</Link>
        </div>
    )
}

export default UnauthorizedMenu
