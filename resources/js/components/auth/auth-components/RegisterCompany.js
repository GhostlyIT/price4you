import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { showNotification } from '../../../helpers/notifications'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import authAction from '../../../store/actions/authAction'
import InputMask from 'react-input-mask'

const RegisterCompany = (props) => {
    const   [name, setName] = useState(''),
            [surname, setSurname] = useState(''),
            [phone, setPhone] = useState(''),
            [password, setPassword] = useState(''),
            [companyName, setCompanyName] = useState(''),
            [companyAddress, setCompanyAddress] = useState(''),
            [companyEmail, setCompanyEmail] = useState(''),
            [companyDirector, setCompanyDirector] = useState(''),
            [disabled, setDisabled] = useState(true),
            [email, setEmail] = useState('')

            const register = () => {
                axios.post('/api/register', {
                    email: email,
                    name: name,
                    surname: surname,
                    phone_number: phone,
                    password: password,
                    account_type: 'company',
                    company_name: companyName,
                    company_address: companyAddress,
                    director_email: companyEmail,
                    director: companyDirector
                })
                .then(response => {
                    showNotification('Регистрация', response.data.message, 'success')
                    props.auth({token: response.data.token, user: response.data.user_data})
                    console.log({token: response.data.token, user: response.data.user_data})
                })
                .catch(error => {
                    showNotification('Регистрация', error.response.data.message, 'danger')
                })
            }

    return (
        <div className="d-flex w-100">
            <div className="d-flex flex-column col-12">
                <h3 className="title text-center mb-2">Регистрация продавца</h3>

                <form className="d-flex flex-column mt-3 mb-3">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <input value={email} onChange={event => setEmail(event.target.value)} className="mt-3 w-100" type="email" placeholder="Почта для входа" />
                            <input value={name} onChange={(event) => setName(event.target.value)} className="mt-3 w-100" id="register__name" type="text" placeholder="Имя" />
                            <input value={surname} onChange={(event) => setSurname(event.target.value)} className="mt-3 w-100" id="register__surname" type="text" placeholder="Фамилия" />
                            <InputMask mask="+7(999)999-99-99" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-3 w-100" id="register__tel" type="tel" placeholder="Номер телефона" />
                            <input value={password} onChange={(event) => setPassword(event.target.value)} className="mt-3 w-100" id="register__pass" type="password" placeholder="Пароль" />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} className="mt-3 w-100" id="register__company-name" type="text" placeholder="Название компании" />
                            <input value={companyAddress} onChange={(event) => setCompanyAddress(event.target.value)} className="mt-3 w-100" id="register__company-office" type="text" placeholder="Офис компании" />
                            <input value={companyEmail} onChange={(event) => setCompanyEmail(event.target.value)} className="mt-3 w-100" id="register__company-email" type="email" placeholder="Почта руководителя" />
                            <input value={companyDirector} onChange={(event) => setCompanyDirector(event.target.value)} className="mt-3 w-100" id="register__company-director" type="text" placeholder="Инициалы руководителя" />
                        </div>
                    </div>
                    <div className="d-flex align-items-center mt-4 mb-4">
                        <input className="mr-3" id="register__agreement" type="checkbox" onChange={() =>setDisabled(!disabled)} />
                        <label className="mb-0" htmlFor="register__agreement">Я принимаю условия пользования сервисами EcoPlant Org.</label>
                    </div>
                    <button onClick={() => register()} type="button" className="main-btn" disabled={disabled}>Зарегистрироваться</button>
                </form>

                {/*<div className="d-flex flex-column align-items-center auth-socials">*/}
                {/*    <span className="mb-3">или войти с помощью</span>*/}
                {/*    <div className="d-flex">*/}
                {/*        { props.socials() }*/}
                {/*    </div>*/}
                {/*</div>*/}
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

export default connect(mapStateToProps, mapDispatchProps)(RegisterCompany);
