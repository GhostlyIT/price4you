import React from 'react'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import Requests from "./company-components/Requests/Requests";

const Company = () => {
    const match = useRouteMatch()
    return(
        <>
            <Route exact path={match.url}>
                <Redirect to={`${match.url}/requests`} />
            </Route>
            <Route path={`${match.url}/requests`}>
                <Requests/>
            </Route>
            <Route path={`${match.url}/options`}>

            </Route>
        </>
    )
}

export default Company
