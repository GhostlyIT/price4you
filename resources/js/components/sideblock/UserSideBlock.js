import React from 'react'
import {Link} from 'react-router-dom'

const UserSideBlock = () => {
    return(
        <div className="d-flex flex-column user-sideblock justify-content-between">
            <div className="avatar">

            </div>

            <h1 className="user-name"></h1>

            <div className="user-sideblock__links d-flex flex-column justify-content-between">
                <Link to="/user/add-request">Добавить запрос</Link>
                <Link to="/user/requests">Мои запросы</Link>
                <Link to="/user/offers">Предложения</Link>
                <Link to="/user/messages">Сообщения</Link>
                <Link to="/search/price">Поиск цены</Link>
                <Link to="/user/settings">Настройки</Link>
                <Link to="/faq/how-works">Как работает сервис</Link>
                <button type="button">Выйти</button>
            </div>
        </div>
    )
}

export default UserSideBlock
