import { combineReducers } from 'redux'
import authReducer from './authReducer'
import updateReducer from "./updateReducer"

const reducers = combineReducers({
    authReducer, updateReducer
});

export default reducers;
