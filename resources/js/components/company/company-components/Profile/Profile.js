import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import updateAction from "../../../../store/actions/updateAction"
import updateUserInfoAction from "../../../../store/actions/updateUserInfoAction"
import {showNotification} from "../../../../helpers/notifications"
import EditCompanyInfoModal from "../../../common/modals/EditCompanyInfoModal"

const Profile = ({token, user, updateUserInfo}) => {
    const company = user.company
    const [isEditModalOpen, setEditModalOpen] = useState(false)

    const editInfo = (companyName, director, address, email, about) => {
        axios.post('/api/company/edit',
            {
                company_name: companyName,
                director: director,
                address: address,
                email: email,
                about: about
            },
            {
                headers: {Authorization: 'Bearer ' + token}
            }
        )
            .then(response => {
                updateUserInfo({user: response.data.user})
                setEditModalOpen(false)
                showNotification('Редактирование', 'Информация успешно изменена', 'success')
            })
            .catch(error => {
                console.log(error.response.data.message)
                showNotification('Редактирование', 'Произошла ошибка при изменении информации.', 'danger')
            })
    }

    return(
        <div className="profile">
            <div className="profile-element profile__avatar d-flex justify-content-center">
                <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    backgroundColor: 'grey'
                }}></div>
            </div>

            <div className="profile-element profile__name">
                <h1>{company.company_name}</h1>
            </div>

            <div className="profile-element profile__contacts d-flex flex-column">
                <h3 className="profile-element__title">Контакты</h3>

                <div className="profile__contacts_item d-flex align-items-center">
                    <span>Руководитель: {company.director}</span>
                </div>

                <div className="profile__contacts_item d-flex align-items-center">
                    <i className="geo-icon"></i>
                    <span>{company.company_address}</span>
                </div>

                <div className="profile__contacts_item d-flex align-items-center">
                    <i className="phone-icon"></i>
                    <span>{user.phone_number}</span>
                </div>

                <div className="profile__contacts_item d-flex align-items-center">
                    <span>Email: {company.email}</span>
                </div>
            </div>

            <div className="profile-element profile__about">
                <h3 className="profile-element__title">О компании</h3>
                {company.about === null ? <p>Нет информации</p> : <p>{company.about}</p>}
            </div>

            <div className="profile-element profile__buttons">
                <button onClick={() => setEditModalOpen(true)} className="main-btn" type="button">Редактировать</button>
            </div>

            <EditCompanyInfoModal
                closeModal={() => setEditModalOpen(false)}
                company={company}
                editFunc={(companyName, director, address, email, about) => editInfo(companyName, director, address, email, about)}
                isModalOpen={isEditModalOpen}
            />
        </div>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
        user: store.authReducer.userData
    }
}

const mapDispatchProps = dispatch => {
    return {
        updateComponent: bindActionCreators(updateAction, dispatch),
        updateUserInfo: bindActionCreators(updateUserInfoAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Profile)
