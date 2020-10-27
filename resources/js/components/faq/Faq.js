import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch} from 'react-router-dom'
import HowWorks from './faq-components/HowWorks'

const Faq = () => {
    const match = useRouteMatch();
    return (
        <div className="faq">

                <Route path={`${match.url}/how-works`}>
                    <HowWorks/>
                </Route>

        </div>
    )
}

export default Faq
