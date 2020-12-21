
const authAction = (payload) => {
    return {
        type: 'AUTH',
        payload: {
            loggedIn: true,
            token: payload.token,
            user: payload.user
        }
    }
}

export default authAction
