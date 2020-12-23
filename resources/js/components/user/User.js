import React from 'react'
import UserRequests from './user-components/UserRequests/UserRequests'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import AddRequest from './user-components/AddRequest/AddRequest'
import {bindActionCreators} from "redux";
import authAction from "../../store/actions/authAction";
import {connect} from "react-redux";


const User = (props) => {
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
