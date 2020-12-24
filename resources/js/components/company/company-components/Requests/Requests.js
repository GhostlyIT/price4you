import React, {useState, useEffect} from 'react'
import axios from "axios"
import {bindActionCreators} from "redux"
import authAction from "../../../../store/actions/authAction"
import {connect} from "react-redux"
import {showNotification} from "../../../functions/notifications"

const Requests = (props) => {
    const [requests, setRequests] = useState([]),
        [requestsCount, setRequestsCount] = useState(0)

    useEffect(() => {
        axios.get('/api/request/get-for-company', {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
        .then(response => {
            setRequests(response.data.requests)
            setRequestsCount(response.data.requests_count)
        })
        .catch(error => {
            console.log(error.response.data.message)
        })
    }, [])

    return (
     <div className="col-12">
         <h1 className="text-center">Запросов нет</h1>
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
