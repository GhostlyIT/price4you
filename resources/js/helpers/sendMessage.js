import axios from "axios"

export const sendMessage = (message, recipient_id, token, theme = null) => {
    axios.post('/api/message/send',
        {
            recipient_id: recipient_id,
            message: message,
            theme: theme
        },
        {
            headers: {'Authorization': 'Bearer ' + token}
        }
    )
    .catch((error) => {
        return false
    })

    return true
}
