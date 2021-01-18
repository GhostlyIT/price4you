import React from 'react'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import Requests from "./company-components/Requests/Requests"
import Responses from "./company-components/Responses/Responses"
import Chat from "../chat/Chat";

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
        </>
    )
}

export default Company
