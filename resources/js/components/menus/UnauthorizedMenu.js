import React from 'react'
import {Link} from 'react-router-dom'

const UnauthorizedMenu = ({closeMenuFunc, isMobile}) => {
    return(
        <div className="d-flex flex-column user-sideblock__links justify-content-between">
            <Link onClick={() => isMobile && closeMenuFunc()} to="/login">Войти</Link>
            <Link onClick={() => isMobile && closeMenuFunc()} to="/register">Регистрация</Link>
            <Link onClick={() => isMobile && closeMenuFunc()} to="/register-company">Регистрация продавца</Link>
            <Link onClick={() => isMobile && closeMenuFunc()} to="/faq/how-works">Как работает сервис</Link>
            <Link onClick={() => isMobile && closeMenuFunc()} to="/faq">Частые вопросы</Link>
        </div>
    )
}


export default UnauthorizedMenu
