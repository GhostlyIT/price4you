import React, {useState, useEffect} from 'react'
import axios from "axios"
import {bindActionCreators} from "redux"
import authAction from "../../../../store/actions/authAction"
import {connect} from "react-redux"
import {showNotification} from "../../../../helpers/notifications"
import UsersRequests from "./components/UsersRequests";

const Requests = (props) => {
    return (
     <div className="col-12">
         <UsersRequests />
     </div>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Requests)
