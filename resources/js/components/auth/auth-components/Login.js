import React, {useState} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import authAction from '../../../store/actions/authAction'
import axios from 'axios'
import {showNotification} from '../../../helpers/notifications'
import MediaQuery from "react-responsive"
import ForgotPasswordModal from "../../common/modals/ForgotPasswordModal";

const Login = (props) => {
    const   [email, setEmail] = useState(''),
            [password, setPassword] = useState(''),
            [isModalOpen, setModalOpen] = useState(false),
            [passwordFieldType, setPasswordFieldType] = useState('password')

    const authAttempt = () => {
        if (props.loggedIn) {
            showNotification('Вход', 'Вход в аккаунт уже выполнен', 'danger')
            return
        }

        axios.post('/api/login', {
            email: email,
            password: password
        })
        .then(response => {
            showNotification('Вход', response.data.message, 'success')
            props.auth({token: response.data.token, user: response.data.user_data})
        })
        .catch(error => {
            showNotification('Вход', error.response.data.message, 'danger')
        })
    }

    return (
        <div className="d-flex">
            <div className="d-flex flex-column col-lg-6 col-sm-12">
                <h3 className="title text-center mb-2">Войти</h3>

                <form className="d-flex flex-column mt-3 mb-3">
                    <input onChange={e => setEmail(e.target.value)} type="email" value={email} placeholder="Email" />

                    <div className="d-flex mt-3 align-items-center">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-75 password-field" type={passwordFieldType} placeholder="Пароль" />
                        <span className="show-pass-btn" onClick={() => passwordFieldType === 'password' ? setPasswordFieldType('text') : setPasswordFieldType('password')}>{passwordFieldType === 'password' ? 'Показать пароль' : 'Скрыть пароль'}</span>
                    </div>

                    <div className="d-flex align-items-center mt-4 mb-4">
                        <input className="mr-3" id="login__remember" type="checkbox" />
                        <label className="mb-0" htmlFor="login__remember">Запомнить меня</label>
                    </div>
                    <button onClick={() => authAttempt()} type="button" className="main-btn">Войти</button>
                    <div className="d-flex justify-content-center mt-4">
                        <a href="#" onClick={e => {
                            e.preventDefault()
                            setModalOpen(true)
                        }}>Забыли пароль?</a>
                    </div>
                </form>

                {/*<div className="d-flex flex-column align-items-center auth-socials">*/}
                {/*    <span className="mb-3">или войти с помощью</span>*/}
                {/*    <div className="d-flex">*/}
                {/*        { props.socials() }*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <ForgotPasswordModal
                closeModalFunc={() => setModalOpen(false)}
                isOpen={isModalOpen}
                modalTitle={"Смена пароля"}
            />
            <MediaQuery minDeviceWidth={1023}>
                <div className="col-6 auth-img">
                    <img src="/images/auth/auth_login.svg" />
                </div>
            </MediaQuery>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        loggedIn: store.authReducer.loggedIn
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Login)
