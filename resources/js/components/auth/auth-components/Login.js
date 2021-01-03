import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import authAction from '../../../store/actions/authAction'
import axios from 'axios'
import InputMask from 'react-input-mask'
import {showNotification} from '../../../helpers/notifications'

const Login = (props) => {
    const   [phone, setPhone] = useState(''),
            [password, setPassword] = useState('')

    const authAttempt = () => {
        if (props.loggedIn) {
            showNotification('Вход', 'Вход в аккаунт уже выполнен', 'danger')
            return
        }

        axios.post('/api/login', {
            phone_number: phone,
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
            <div className="d-flex flex-column col-md-6 col-sm-12">
                <h3 className="title text-center mb-2">Войти</h3>
                <Link to="/register" className="text-center">Регистрация</Link>

                <form className="d-flex flex-column mt-3">
                    <InputMask mask="+7(999)999-99-99" value={phone} onChange={(e) => setPhone(e.target.value)} id="login__tel" type="tel" placeholder="Номер телефона" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-3 w-100" id="login__pass" type="password" placeholder="Пароль" />
                    <div className="d-flex align-items-center mt-4 mb-4">
                        <input className="mr-3" id="login__remember" type="checkbox" />
                        <label className="mb-0" htmlFor="login__remember">Запомнить меня</label>
                    </div>
                    <button onClick={() => authAttempt()} type="button" className="main-btn">Войти</button>
                </form>

                <div className="d-flex flex-column align-items-center auth-socials">
                    <span className="mb-3">или войти с помощью</span>
                    <div className="d-flex">
                        { props.socials() }
                    </div>
                </div>
            </div>
            <div className="col-md-6 d-none d-md-flex auth-img">
                <img src="/images/auth/auth_login.svg" />
            </div>
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
