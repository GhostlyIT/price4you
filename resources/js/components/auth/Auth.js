import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import Register from './Register'
import RegisterCompany from './RegisterCompany'
import SideBlock from './SideBlock'

const Auth = () => {
    const [view, changeView] = useState('login');

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

    const currentView = () => {
        switch (view) {
            case 'register':
                return (<Register changeView={changeView} socials={getSocials} />)

            case 'register_company':
                return (<RegisterCompany changeView={changeView} socials={getSocials} />)

            default:
                return (<Login changeView={changeView} socials={getSocials} />)
        }
    }

    return (
        <div className="row">
            <div className="col-12 main-window mt-3">
                <div className="row">
                    <div className="col-md-9 col-sm-12">
                        <div className="main-window__inner row">
                            { currentView() }
                        </div>
                    </div>
                    <div className="col-md-3 d-none d-md-flex justify-content-center flex-column">
                        <SideBlock changeView={changeView} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
