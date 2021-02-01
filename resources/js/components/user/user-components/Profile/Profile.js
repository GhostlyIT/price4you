import React, {useState, useRef} from 'react'
import {bindActionCreators} from "redux";
import updateAction from "../../../../store/actions/updateAction";
import updateUserInfoAction from "../../../../store/actions/updateUserInfoAction";
import {connect} from "react-redux";
import EditUserInfoModal from "../../../common/modals/EditUserInfoModal";
import axios from "axios";
import {showNotification} from "../../../../helpers/notifications";
import {editAvatar} from "../../../../helpers/editAvatar";

const Profile = ({user, token, updateUserInfo}) => {
    const input = useRef(null)
    const [isEditModalOpen, setEditModalOpen] = useState(false)

    const editInfo = (name, surname, phone, email) => {
        axios.post('/api/user/edit',
            {
                email: email,
                name: name,
                surname: surname,
                phone_number: phone,
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
                <input onChange={e => editAvatar(e.target.files[0], token, input.current, updateUserInfo)} type="file" ref={input} style={{display: 'none'}} />
                {user.avatar == null
                    ? <div onClick={() => input.current.click()} className="avatar"></div>
                    : <div onClick={() => input.current.click()} className="avatar" style={{backgroundImage: `url(${user.avatar})`}}></div>
                }

            </div>

            <div className="profile-element profile__name">
                <h1>{user.name} {user.surname}</h1>
            </div>

            <div className="profile-element profile__contacts d-flex flex-column">
                <h3 className="profile-element__title">Контакты</h3>

                <div className="profile__contacts_item d-flex align-items-center">
                    <span>Имя: {user.name}</span>
                </div>

                <div className="profile__contacts_item d-flex align-items-center">
                    <span>Фамилия: {user.surname}</span>
                </div>

                <div className="profile__contacts_item d-flex align-items-center">
                    <i className="phone-icon"></i>
                    <span>{user.phone_number}</span>
                </div>

                <div className="profile__contacts_item d-flex align-items-center">
                    <span>Email: {user.email}</span>
                </div>
            </div>

            <div className="profile-element profile__buttons">
                <button onClick={() => setEditModalOpen(true)} className="main-btn" type="button">Редактировать</button>
            </div>

            <EditUserInfoModal
                closeModal={() => setEditModalOpen(false)}
                user={user}
                editFunc={(name, surname, phone, email) => editInfo(name, surname, phone, email)}
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
