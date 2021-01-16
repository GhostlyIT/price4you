import axios from "axios"

const offerUrls = {
    accept: 'accept',
    reject: 'reject',
    sendToClose: 'send-to-close',
    close: 'close'
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
