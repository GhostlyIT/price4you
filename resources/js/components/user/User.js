import React from 'react'
import UserRequests from './user-components/UserRequests/UserRequests'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import AddRequest from './user-components/AddRequest/AddRequest'
import {bindActionCreators} from "redux";
import authAction from "../../store/actions/authAction";
import {connect} from "react-redux";
import Options from "./user-components/Options/Options";
import Offers from "./user-components/Offers/Offers";
import Chat from "../chat/Chat";
import Profile from "./user-components/Profile/Profile";
import MediaQuery from "react-responsive/src";
import MobileChat from "../chat/MobileChat";
import Archive from "./user-components/Archive/Archive";

const User = (props) => {
    const match = useRouteMatch()
    match.url = '/user'
    return(
        <>
            <Route exact path="/">
                <Redirect to="/user" />
            </Route>
            <Route path="/login">
                <Redirect to="/user" />
            </Route>
            <Route exact path={match.url}>
                <Redirect to={`${match.url}/requests`} />
            </Route>
            <Route path={`${match.url}/requests`}>
                <UserRequests />
            </Route>
            <Route path={`${match.url}/add-request`}>
                <AddRequest />
            </Route>
            <Route path={`${match.url}/settings`}>
                <Options />
            </Route>
            <Route path={`${match.url}/offers`}>
                <Offers />
            </Route>
            <Route path={`${match.url}/messages`}>
                <MediaQuery maxDeviceWidth={1023}>
                    <MobileChat/>
                </MediaQuery>
                <MediaQuery minDeviceWidth={1023}>
                    <Chat/>
                </MediaQuery>
            </Route>
            <Route path={`${match.url}/info`}>
                <Profile />
            </Route>
            <Route path={`${match.url}/archive`}>
                <Archive/>
            </Route>
        </>
    )
};

const mapStateToProps = store => {
    return {
        user: store.authReducer.userData,
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(User)
