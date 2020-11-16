import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Auth from './auth/Auth'
import SideBlock from './sideblock/SideBlock'
import Faq from './faq/Faq'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store/store'
import {saveState} from '../store/localStorage'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css';

const Main = () => {
    store.subscribe(() => {
        saveState(store.getState())
    })

    return (
        <Router>
            <div className="main position-relative">
                <div className="main-background" />
                <div className="container">
                    <div className="row">
                        <div className="col-12 main-window mt-3">
                            <div className="row">
                                <div className="col-md-9 col-sm-12">
                                    <div className="main-window__inner row">
                                        <Route path="/">
                                            <Redirect to="/login" />
                                            <Auth />
                                        </Route>
                                        <Route path="/faq">
                                            <Faq />
                                        </Route>
                                    </div>
                                </div>
                                <div className="col-md-3 d-none d-md-flex flex-column">
                                    <SideBlock />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <ReactNotification />
            <Main />
        </Provider>,
        document.getElementById('root')
    );
}
