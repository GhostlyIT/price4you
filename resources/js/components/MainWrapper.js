import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, Link, Redirect, HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store/store'
import {saveState} from '../store/localStorage'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import Main from './Main'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const MainWrapper = () => {
    store.subscribe(() => {
        saveState(store.getState())
    })

    return (
        <Router>
            <Main />
        </Router>
    )
}
export default MainWrapper;

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <ReactNotification />
            <MainWrapper />
        </Provider>,
        document.getElementById('root')
    );
}
