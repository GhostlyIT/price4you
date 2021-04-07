import React from 'react'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import Requests from "./company-components/Requests/Requests"
import Responses from "./company-components/Responses/Responses"
import Chat from "../chat/Chat"
import Options from "./company-components/Options/Options"
import Profile from "./company-components/Profile/Profile"
import MediaQuery from "react-responsive/src";
import MobileChat from "../chat/MobileChat";

const Company = () => {
    const match = useRouteMatch()
    match.url = '/company'
    return(
        <>
            <Route path="/login">
                <Redirect to="/company" />
            </Route>
            <Route exact path={match.url}>
                <Redirect to={`${match.url}/requests`} />
            </Route>
            <Route path={`${match.url}/requests`}>
                <Requests />
            </Route>
            <Route path={`${match.url}/responses`}>
                <Responses />
            </Route>
            <Route path={`${match.url}/messages`}>
                <MediaQuery maxDeviceWidth={1023}>
                    <MobileChat/>
                </MediaQuery>
                <MediaQuery minDeviceWidth={1023}>
                    <Chat/>
                </MediaQuery>
            </Route>
            <Route path={`${match.url}/settings`}>
                <Options />
            </Route>
            <Route path={`${match.url}/info`}>
                <Profile />
            </Route>
        </>
    )
}

export default Company
