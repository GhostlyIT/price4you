import React from 'react'
import UserRequests from './user-components/UserRequests/UserRequests'
import {Route, Redirect, useRouteMatch} from 'react-router-dom'
import AddRequest from './user-components/AddRequest/AddRequest'
import {bindActionCreators} from "redux";
import authAction from "../../store/actions/authAction";
import {connect} from "react-redux";
import Options from "./user-components/Options/Options";
import Offers from "./user-components/Offers/Offers";


const User = (props) => {
    const match = useRouteMatch()
    return(
        <>
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
