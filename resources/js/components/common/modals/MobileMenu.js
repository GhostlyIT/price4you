import React from 'react'
import MyModal from "../modal"
import UnauthorizedMenu from "../../menus/UnauthorizedMenu"
import UserMenu from "../../menus/UserMenu"
import CompanyMenu from "../../menus/CompanyMenu"
import {connect} from "react-redux";

const MobileMenu = ({isMenuOpen, closeModalFunc, user}) => {

    const chooseMenu = user => {
        if (user) {
            switch (user.account_type) {
                case "user":
                    return (<UserMenu closeMenuFunc={closeModalFunc} isMobile={true}/>)
                case "company":
                    return (<CompanyMenu closeMenuFunc={closeModalFunc} isMobile={true}/>)
                default:
                    return (<UnauthorizedMenu closeMenuFunc={closeModalFunc} isMobile={true}/>)
            }
        }
        return (<UnauthorizedMenu closeMenuFunc={closeModalFunc} isMobile={true}/>)
    }

    return(
        <MyModal isOpen={isMenuOpen} closeModal={closeModalFunc} modalTitle="Меню">
            {chooseMenu(user)}
        </MyModal>
    )
}

const mapStateToProps = store => {
    return {
        user: store.authReducer.userData
    };
}


export default connect(mapStateToProps)(MobileMenu)
