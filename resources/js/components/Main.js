import React, {useState} from 'react'
import Auth from './auth/Auth'
import SideBlock from './sideblock/SideBlock'
import Faq from './faq/Faq'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import { bindActionCreators } from 'redux'
import authAction from '../store/actions/authAction'
import User from './user/User'
import UserSideBlock from './sideblock/UserSideBlock'
import Company from "./company/Company"
import CompanySideBlock from "./sideblock/CompanySideBlock"
import Header from "./common/Header"
import MediaQuery from "react-responsive/src"
import MobileMenu from "./common/modals/MobileMenu"
import TermsOfUse from '../docs/terms_of_use.pdf'

const Main = (props) => {
    const [isMenuOpen, setMenuOpen] = useState(false)

    let userPage = "/user", sideBlock = <UserSideBlock />

    if (props.loggedIn && props.user.account_type === 'company') {
        userPage = "/company"
        sideBlock = <CompanySideBlock />
    }

    return (
        <div className="main position-relative">
            <div className="main-background" />
            <div className="container" style={{flex: "1 0 auto"}}>
                <div className="row">
                    <div className="col-12 main-window mt-3 mb-3">
                        <Header openMenuFunc={() => setMenuOpen(true)} />
                        <div className="row">
                            <div className="col-lg-10 col-sm-12">
                                <div className="main-window__inner">
                                    <Route path="/">
                                        {props.loggedIn ? <Redirect to={userPage} /> : <Auth />}
                                    </Route>
                                    <Route path="/user">
                                        <User />
                                    </Route>
                                    <Route path="/company">
                                        <Company />
                                    </Route>
                                    <Route path="/faq">
                                        <Faq />
                                    </Route>
                                </div>
                            </div>
                            <MediaQuery minDeviceWidth={1023}>
                                <div className="col-2 flex-column">
                                    {props.loggedIn ? sideBlock : <SideBlock />}
                                </div>
                            </MediaQuery>
                            <MediaQuery maxDeviceWidth={1023}>
                                <MobileMenu isMenuOpen={isMenuOpen} closeModalFunc={() => setMenuOpen(false)} />
                            </MediaQuery>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__wrapper">
                <div className="d-flex container justify-content-between footer">
                    <span>© {new Date().getFullYear()}. EcoPlant Organization. Все права защищены</span>
                    <a href={TermsOfUse} target="_blank">Условия пользования</a>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        loggedIn: store.authReducer.loggedIn,
        user: store.authReducer.userData
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Main);
