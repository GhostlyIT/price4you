import React from 'react'
import ReactDOM from 'react-dom'

const RegisterCompany = (props) => {

    return (
        <div className="d-flex w-100">
            <div className="d-flex flex-column col-12">
                <h3 className="title text-center mb-2">Регистрация компании</h3>
                <a onClick={() => props.changeView('register')} className="text-center" href="#">Регистрация</a>

                <form className="d-flex flex-column mt-3">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <input className="mt-3 w-100" id="register__name" type="text" placeholder="Имя" />
                            <input className="mt-3 w-100" id="register__surname" type="text" placeholder="Фамилия" />
                            <input className="mt-3 w-100" id="register__tel" type="tel" placeholder="Номер телефона" />
                            <input className="mt-3 w-100" id="register__pass" type="password" placeholder="Пароль" />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <input className="mt-3 w-100" id="register__company-name" type="text" placeholder="Название компании" />
                            <input className="mt-3 w-100" id="register__company-office" type="text" placeholder="Офис компании" />
                            <input className="mt-3 w-100" id="register__company-email" type="email" placeholder="Почта руководителя" />
                            <input className="mt-3 w-100" id="register__company-director" type="text" placeholder="Инициалы руководителя" />
                        </div>
                    </div>
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
        </div>
    )
}

export default RegisterCompany;
