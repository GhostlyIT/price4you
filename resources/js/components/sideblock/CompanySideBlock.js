import React from 'react'
import {connect} from "react-redux"
import CompanyMenu from "../menus/CompanyMenu"

const CompanySideblock = (props) => {
    return(
        <div className="d-flex flex-column user-sideblock justify-content-between">

            {props.userData.avatar == null
                ? <div className="avatar mb-4"></div>
                : <div className="avatar mb-4" style={{backgroundImage: `url(${props.userData.avatar})`}}></div>
            }

            <h3 className="user-name">{props.userData.company.company_name}</h3>

            <CompanyMenu />
        </div>
    )
}

const mapStateToProps = store => {
    return {
        userData: store.authReducer.userData
    };
}

export default connect(mapStateToProps)(CompanySideblock)
