import axios from "axios";
import {showNotification} from "../../../../helpers/notifications";

export const changeArchiveFilter = (filter, clickedBtn, token, callback) => {

    $('.archive-btn').removeClass('active')
    $(clickedBtn).addClass('active')

    axios.get(`/api/response/archive/${filter}`, {
        headers: {Authorization: 'Bearer ' + token}
    })
    .then(response => {
        callback(response.data.responses)
    })
    .catch(() => {
        showNotification('Ошибка', 'Произошла ошибка при загрузке архива', 'danger')
    })
}
