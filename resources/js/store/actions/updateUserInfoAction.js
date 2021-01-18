
const updateUserInfoAction = payload => {
    return {
        type: 'UPDATE_USER_INFO',
        payload: {
            user: payload.user
        }
    }
}

export default updateUserInfoAction
