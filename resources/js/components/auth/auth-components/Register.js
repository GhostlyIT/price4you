import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'

const Register = (props) => {

    return (
        <div className="d-flex">
            <div className="d-flex flex-column col-md-6 col-sm-12">
                <h3 className="title text-center mb-2">Регистрация</h3>
                <Link to="/register-company" className="text-center">Регистрация компании</Link>

                <form className="d-flex flex-column mt-3">
                    <input className="mt-3 w-100" id="register__name" type="text" placeholder="Имя" />
                    <input className="mt-3 w-100" id="register__surname" type="text" placeholder="Фамилия" />
                    <input className="mt-3 w-100" id="register__tel" type="tel" placeholder="Номер телефона" />
                    <input className="mt-3 w-100" id="register__pass" type="password" placeholder="Пароль" />
                    <div className="d-flex align-items-center mt-4 mb-4">
                        <input className="mr-3" id="register__agreement" type="checkbox" />
                        <label className="mb-0" htmlFor="register__agreement">Я принимаю условия пользования сервисами EcoPlant Org.</label>
                    </div>
                    <button type="button" className="main-btn">Зарегистрироваться</button>
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

export default Register;
