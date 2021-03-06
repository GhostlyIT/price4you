import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import InputMask from 'react-input-mask'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import authAction from '../../../store/actions/authAction'
import { showNotification } from '../../../helpers/notifications'

const Register = (props) => {
    const   [name, setName] = useState(''),
            [surname, setSurname] = useState(''),
            [phone, setPhone] = useState(''),
            [password, setPassword] = useState(''),
            [disabled, setDisabled] = useState(true),
            [email, setEmail] = useState(''),
            [passwordFieldType, setPasswordFieldType] = useState('password')

    const register = () => {
        axios.post('/api/register', {
            email: email,
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

                <form className="d-flex flex-column mt-3 mb-3">
                    <input onChange={e => setEmail(e.target.value)} type="email" className="mt-3 w-100" placeholder="Ваш Email" />
                    <input value={name} onChange={(event) => setName(event.target.value)} className="mt-3 w-100" id="register__name" type="text" placeholder="Имя" />
                    <input value={surname} onChange={(event) => setSurname(event.target.value)} className="mt-3 w-100" id="register__surname" type="text" placeholder="Фамилия" />
                    <InputMask mask="+7(999)999-99-99" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-3 w-100" id="register__tel" type="tel" placeholder="Номер телефона" />
                    <div className="d-flex mt-3 align-items-center">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-75 password-field" type={passwordFieldType} placeholder="Пароль" />
                        <span className="show-pass-btn" onClick={() => passwordFieldType === 'password' ? setPasswordFieldType('text') : setPasswordFieldType('password')}>{passwordFieldType === 'password' ? 'Показать пароль' : 'Скрыть пароль'}</span>
                    </div>
                    <div className="d-flex align-items-center mt-4 mb-4">
                        <input className="mr-3" id="register__agreement" type="checkbox" onChange={() => setDisabled(!disabled)} />
                        <label className="mb-0" htmlFor="register__agreement">Я принимаю условия пользования сервисами EcoPlant Org.</label>
                    </div>
                    <button onClick={() => register()} type="button" className="main-btn" disabled={disabled} >Зарегистрироваться</button>
                </form>

                {/*<div className="d-flex flex-column align-items-center auth-socials">*/}
                {/*    <span className="mb-3">или войти с помощью</span>*/}
                {/*    <div className="d-flex">*/}
                {/*        { props.socials() }*/}
                {/*    </div>*/}
                {/*</div>*/}
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
