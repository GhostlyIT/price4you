import axios from "axios"

const offerUrls = {
    accept: 'accept',
    reject: 'reject',
    sendToClose: 'send-to-close',
    close: 'close'
}

export const getTextForStatus = status => {
    const textsForStatuses = {
        open: 'Клиент еще не отреагировал на Ваше предложение.',
        accepted: 'Клиент принял Ваше предложение. Свяжитесь с ним для заключения сделки.',
        rejected: 'Клиент отклонил Ваше предложение.',
        awaits_for_closing: 'Ожидание подтверждения закрытия сделки со стороны клиента.',
        closed: 'Сделка успешно завершена.'
    }

    if (status in textsForStatuses) {
        return textsForStatuses[status]
    }

    return 'Ошибка загрузки статуса.'
}

export const changeOfferStatus = (token, newStatus, offerId) => {
    if (newStatus in offerUrls) {
        axios.post(`/api/response/${offerUrls[newStatus]}`,
            {
                response_id: offerId
            },
            {
                headers: {'Authorization': 'Bearer ' + token}
            }
        )
        .catch(error => {
            return false
        })

        return true
    }
    return false
}
