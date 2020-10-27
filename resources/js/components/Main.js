import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Auth from './auth/Auth'
import SideBlock from './sideblock/SideBlock'
import Faq from './faq/Faq'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'

const Main = () => {
    const [loggedIn, setLoggedIn] = useState(false);
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
                                <div className="col-md-3 d-none d-md-flex justify-content-center flex-column">
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
    ReactDOM.render(<Main />, document.getElementById('root'));
}
