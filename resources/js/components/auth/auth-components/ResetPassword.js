import React, { useState } from 'react'
import axios from "axios"
import {useParams, useLocation} from 'react-router-dom'
import {showNotification} from "../../../helpers/notifications"

const ResetPassword = () => {
    let {token} = useParams()
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery()
    let email = query.get('email')

    const [password, setPassword] = useState(''),
            [rePassword, setRePassword] = useState('')

    const resetPassword = () => {
        axios.post('/api/reset-password', {
            token: token,
            email: email,
            password: password,
            password_confirmation: rePassword
        })
        .then(response => {
            showNotification('Смена пароля', 'Пароль успешно изменен. Теперь Вы может войти с новым паролем.', 'success')
            setTimeout(() => {
                window.location.replace("/")
            }, 1000)
        })
        .catch(error => {
            showNotification('Смена пароля', error.response.data.message, 'danger')
        })
    }

    return(
        <div className="d-flex">
            <div className="d-flex flex-column col-12">
                <h3 className="title text-center mb-2">Изменить пароль {email}</h3>
                <form className="d-flex flex-column mt-3 mb-3">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-3 w-100" type="password" placeholder="Пароль" />
                    <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} className="mt-3 w-100" type="password" placeholder="Повторите пароль" />
                    <button onClick={() => resetPassword()} type="button" className="main-btn mt-3">Изменить пароль</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
