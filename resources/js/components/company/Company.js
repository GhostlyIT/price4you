import React from 'react'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'

const Company = () => {
    const match = useRouteMatch()
    return(
        <>
            <Route path={match.url}>
                <Redirect to={`${match.url}/requests`} />
            </Route>
            <Route path={`${match.url}/requests`}>

            </Route>
            <Route path={`${match.url}/options`}>

            </Route>
        </>
    )
}

export default Company
