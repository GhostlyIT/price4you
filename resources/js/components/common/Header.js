import React from 'react'
import {Link} from "react-router-dom"
import MediaQuery from "react-responsive"

const Header = () => {
    return(
        <div className="header">
            <a href="/" className="logo" />

            <MediaQuery minDeviceWidth={1023}>
                <div className="header__links">
                    <a href="https://ecoplantagro.ru/">EcoPlant Агро</a>
                    <a href="mailto:info@ecoplant.org">Поддержка</a>
                    <Link to="/faq">Частые вопросы</Link>
                </div>
            </MediaQuery>

            <MediaQuery maxDeviceWidth={1023}>
                <button className="menu__trigger" />
            </MediaQuery>
        </div>
    )
}

export default Header
