import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import Register from './Register'
import RegisterCompany from './RegisterCompany'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'

const Auth = () => {
    const socials = [
        {
            name: 'google',
            link: '#'
        },
        {
            name: 'fb',
            link: '#'
        },
        {
            name: 'linkedin',
            link: '#'
        },
        {
            name: 'twitter',
            link: '#'
        },
    ]

    const getSocials = () => {
        return socials.map(social => {
            return(
                <a href={social.link} key={socials.indexOf(social)} className="mr-2">
                    <img src={`/images/social/${social.name}.svg`} />
                </a>
            )
        })
    }

    return (
        <div>
            <Redirect to="/login" />
            <Switch>
                <Route path="/register">
                    <Register socials={getSocials}/>
                </Route>
                <Route path="/login">
                    <Login socials={getSocials}/>
                </Route>
                <Route path="/register-company">
                    <RegisterCompany socials={getSocials}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Auth
