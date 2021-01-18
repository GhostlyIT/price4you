import initialState from '../initialState'

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AUTH':
            return {
                loggedIn: action.payload.loggedIn,
                userToken: action.payload.token,
                userData: action.payload.user
            }

        case 'EXIT':
            return {}

        case 'UPDATE_USER_INFO':
            return {
                ...state,
                userData: action.payload.user
            }

        default:
            return state
    }
}

export default authReducer
