import React from 'react'
import UserRequests from './user-components/UserRequests'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import AddRequest from './user-components/AddRequest/AddRequest'


const User = () => {
    const match = useRouteMatch()
    return(
        <>
            <Route path={match.url}>
                <Redirect to={`${match.url}/requests`} />
            </Route>
            <Route path={`${match.url}/requests`}>
                <UserRequests />
            </Route>
            <Route path={`${match.url}/add-request`}>
                <AddRequest />
            </Route>
        </>
    )
}

export default User
