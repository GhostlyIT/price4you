import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
    return(
        <div className="header">
            <a href="/" className="logo" />
            <div className="header__links">
                <a href="https://ecoplantagro.ru/">EcoPlant Агро</a>
                <a href="mailto:info@ecoplant.org">Поддержка</a>
                <Link to="/faq">Частые вопросы</Link>
            </div>
        </div>
    )
}

export default Header
