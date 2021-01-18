import React from 'react'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import Requests from "./company-components/Requests/Requests"
import Responses from "./company-components/Responses/Responses"
import Chat from "../chat/Chat"
import Options from "./company-components/Options/Options"
import Profile from "./company-components/Profile/Profile"

const Company = () => {
    const match = useRouteMatch()
    return(
        <>
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
                <Chat />
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
