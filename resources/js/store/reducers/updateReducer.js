import {initialUpdateState} from "../initialState";

const updateReducer = (state = initialUpdateState, action) => {
    let counter = 0
    if (state.counter < 1) {
        counter = 1
    }
    switch(action.type) {
        case 'UPDATE':
            return {
                ...state,
                counter: counter
            }

        default:
            return state
    }
}

export default updateReducer
