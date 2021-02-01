import axios from "axios";
import {showNotification} from "./notifications";

export const editAvatar = (file, token, input, updateUserFunc) => {
    let data = new FormData()
    data.append('avatar', file, file.name)
    axios.post('/api/user/avatar/change',
        data,
        {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        }
    )
        .then(response => {
            updateUserFunc({user: response.data.user})
            showNotification('Редактирование', 'Аватар успешно изменен', 'success')
        })
        .catch(error => {
            console.log(error.response.data.message)
            showNotification('Редактирование', 'Произошла ошибка при изменении аватара.', 'danger')
        })
        .then(() => input.value = '')
}
