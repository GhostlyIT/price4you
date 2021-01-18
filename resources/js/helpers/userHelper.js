import axios from "axios"

export const getContactData = (token, userId) => {
    let result = false
    axios.get(
        '/api/user/contact-data?user_id=' + userId,
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )
    .then(response => {
        setData(response.data.contact_data)
    })
    .catch(error => {
        setData(false)
    })
    console.log(result)
    return result
}
