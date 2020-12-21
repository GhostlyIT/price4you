import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import InputMask from 'react-input-mask'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import authAction from '../../../store/actions/authAction'
import { showNotification } from '../../functions/notifications'

const Register = (props) => {
    const   [name, setName] = useState(''),
            [surname, setSurname] = useState(''),
            [phone, setPhone] = useState(''),
            [password, setPassword] = useState(''),
            [disabled, setDisabled] = useState(true)

    const register = () => {
        axios.post('/api/register', {
            name: name,
            surname: surname,
            phone_number: phone,
            password: password,
            account_type: 'user'
        })
        .then(response => {
            showNotification('Регистрация', response.data.message, 'success')
            props.auth({token: response.data.token, user: response.data.user_data})
        })
        .catch(error => {
            showNotification('Регистрация', error.response.data.message, 'danger')
        })
    }

    return (
        <div className="d-flex">
            <div className="d-flex flex-column col-md-6 col-sm-12">
                <h3 className="title text-center mb-2">Регистрация</h3>
                <Link to="/register-company" className="text-center">Регистрация компании</Link>

                <form className="d-flex flex-column mt-3">
                    <input value={name} onChange={(event) => setName(event.target.value)} className="mt-3 w-100" id="register__name" type="text" placeholder="Имя" />
                    <input value={surname} onChange={(event) => setSurname(event.target.value)} className="mt-3 w-100" id="register__surname" type="text" placeholder="Фамилия" />
                    <InputMask mask="+7(999)999-99-99" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-3 w-100" id="register__tel" type="tel" placeholder="Номер телефона" />
                    <input value={password} onChange={(event) => setPassword(event.target.value)} className="mt-3 w-100" id="register__pass" type="password" placeholder="Пароль" />
                    <div className="d-flex align-items-center mt-4 mb-4">
                        <input className="mr-3" id="register__agreement" type="checkbox" onChange={() => setDisabled(!disabled)} />
                        <label className="mb-0" htmlFor="register__agreement">Я принимаю условия пользования сервисами EcoPlant Org.</label>
                    </div>
                    <button onClick={() => register()} type="button" className="main-btn" disabled={disabled} >Зарегистрироваться</button>
                </form>

                <div className="d-flex flex-column align-items-center auth-socials">
                    <span className="mb-3">или войти с помощью</span>
                    <div className="d-flex">
                        { props.socials() }
                    </div>
                </div>
            </div>
            <div className="col-md-6 d-none d-md-flex auth-img">
                <img src="/images/auth/auth_register.svg" />
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        userToken: store.authReducer.userToken
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Register);
