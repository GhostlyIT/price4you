import React from 'react'
import Auth from './auth/Auth'
import SideBlock from './sideblock/SideBlock'
import Faq from './faq/Faq'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import { bindActionCreators } from 'redux'
import authAction from '../store/actions/authAction'
import User from './user/User'
import UserSideBlock from './sideblock/UserSideBlock'
import Company from "./company/Company";
import CompanySideBlock from "./sideblock/CompanySideBlock";

const Main = (props) => {

    let userPage = "/user", sideBlock = <UserSideBlock />

    if (props.loggedIn && props.user.account_type === 'company') {
        userPage = "/company"
        sideBlock = <CompanySideBlock />
    }

    return (
        <div className="main position-relative">
            <div className="main-background" />
            <div className="container">
                <div className="row">
                    <div className="col-12 main-window mt-3">
                        <div className="row">
                            <div className="col-md-10 col-sm-12">
                                <div className="main-window__inner row">
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
                            <div className="col-md-2 d-none d-md-flex flex-column">
                                {props.loggedIn ? sideBlock : <SideBlock />}
                            </div>
                        </div>
                    </div>
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
