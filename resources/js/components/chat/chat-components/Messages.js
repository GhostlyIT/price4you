import React from 'react'
import {getFullDate} from "../../../helpers/dateConverter"

const Messages = ({messages}) => {
    if (messages.length > 0) {
        return messages.map(message => {
            const sender = message.sender
            const company = sender.company
            const date = getFullDate(message.created_at)
            const theme = message.theme
            let fullName = sender.name + ' ' + sender.surname
            let avatar = sender.avatar

            if (sender.account_type === 'company') {
                fullName = company.company_name
            }

            return (
                <div key={message.id} className="message d-flex">
                    {avatar == null
                        ? <div className="avatar avatar--small mr-3"></div>
                        : <div className="avatar avatar--small mr-3" style={{backgroundImage: `url(${avatar})`}}></div>
                    }

                    <div className="message__main w-100">
                        <div className="message__main_head d-flex align-items-center w-100">
                            <div className="d-flex flex-column mb-3">
                                <div className="d-flex align-items-center">
                                    <span className="message__main_head__name">{fullName}</span>
                                    <span>{date}</span>
                                </div>
                                {theme != null &&
                                    <span className="font-weight-bold">Тема: {theme}</span>
                                }
                            </div>

                        </div>
                        <div className="message__main_body">
                            <p>{message.message}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return(<h1 className="text-center mt-3">Выберите собеседника</h1>)
}

export default Messages
