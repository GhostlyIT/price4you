import React from 'react'
import ReactDOM from 'react-dom'

const Login = (props) => {



    return (
        <div className="d-flex">
            <div className="d-flex flex-column col-md-6 col-sm-12">
                <h3 className="title text-center mb-2">Войти</h3>
                <a onClick={() => props.changeView('register')} className="text-center" href="#">Создать учетную запись</a>

                <form className="d-flex flex-column mt-3">
                    <input id="login__tel" type="tel" placeholder="Номер телефона" />
                    <input className="mt-3 w-100" id="login__pass" type="password" placeholder="Пароль" />
                    <div className="d-flex align-items-center mt-4 mb-4">
                        <input className="mr-3" id="login__remember" type="checkbox" />
                        <label className="mb-0" htmlFor="login__remember">Запомнить меня</label>
                    </div>
                    <button type="button" className="main-btn">Войти</button>
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

export default Login;
