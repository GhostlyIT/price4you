import React from 'react'
import ReactDOM from 'react-dom'

const SideBlock = (props) => {
    return (
        <div className="d-flex flex-column auth-sideblock justify-content-between">
            <div className="d-flex flex-column auth-nav">
                <a onClick={() => props.changeView('login')} href="#">Войти</a>
                <a onClick={() => props.changeView('register')} href="#">Регистрация</a>
                <a onClick={() => props.changeView('register_company')} href="#">Регистрация компании</a>
            </div>
            <div className="d-flex flex-column auth-faq">
                <a href="#">EcoPlant Агро</a>
                <a href="#">EcoPlant | Price4you</a>
                <a href="#">Как работает сервис</a>
                <a href="#">Частые вопросы</a>
            </div>
        </div>
    )
}

export default SideBlock;
