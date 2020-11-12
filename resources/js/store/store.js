import {createStore} from 'redux'
import reducers from './reducers/reducers'
import {loadState} from './localStorage'

const persistedState = loadState()
const store = createStore(reducers, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
