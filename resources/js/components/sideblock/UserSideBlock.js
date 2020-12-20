import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const UserSideBlock = () => {
    const [activeLink, setActiveLink] = useState(2)

    return(
        <div className="d-flex flex-column user-sideblock justify-content-between">
            <div className="avatar">

            </div>

            <h1 className="user-name"></h1>

            <div className="user-sideblock__links d-flex flex-column justify-content-between">
                <Link onClick={() => setActiveLink('1')} className={window.location.pathname === '/user/add-request' ? 'active' : null} to="/user/add-request">Добавить запрос</Link>
                <Link onClick={() => setActiveLink('2')} className={window.location.pathname === '/user/requests' || activeLink === 2 ? 'active' : null} to="/user/requests">Мои запросы</Link>
                <Link onClick={() => setActiveLink('3')} className={window.location.pathname === '/user/offers' ? 'active' : null} to="/user/offers">Предложения</Link>
                <Link onClick={() => setActiveLink('4')} className={window.location.pathname === '/user/messages' ? 'active' : null} to="/user/messages">Сообщения</Link>
                <Link onClick={() => setActiveLink('5')} className={window.location.pathname === '/search/price' ? 'active' : null} to="/search/price">Поиск цены</Link>
                <Link onClick={() => setActiveLink('6')} className={window.location.pathname === '/user/settings' ? 'active' : null} to="/user/settings">Настройки</Link>
                <Link onClick={() => setActiveLink('7')} className={window.location.pathname === '/faq/how-works' ? 'active' : null} to="/faq/how-works">Как работает сервис</Link>
                <button type="button">Выйти</button>
            </div>
        </div>
    )
}

export default UserSideBlock
