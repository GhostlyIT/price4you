
const authAction = (payload) => {
    return {
        type: 'AUTH',
        payload: {
            loggedIn: true,
            token: payload
        }
    }
}

export default authAction
