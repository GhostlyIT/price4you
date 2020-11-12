import initialState from '../initialState'

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AUTH':
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
                userToken: action.payload.token
            }

        default:
            return state
    }
}

export default authReducer
