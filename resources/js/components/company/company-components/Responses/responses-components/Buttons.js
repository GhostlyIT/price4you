import React from 'react'

const Buttons = ({status, actions}) => {
    switch (status) {
        case 'accepted':
            return (
                <>
                    <button onClick={() => actions.showContacts()} type="button" className="secondary-btn mb-3">Контактные данные</button>
                    <button onClick={() => actions.closeDeal()} type="button" className="main-btn mb-3">Закрыть сделку</button>
                    <small>При нажатии на кнопку «Закрыть сделку» мы переносим товар в раздел «Архив» с заявки клиента. </small>
                </>
            )

        case 'awaits_for_closing':
            return(
                <button onClick={() => actions.showContacts()} type="button" className="secondary-btn">Контактные данные</button>
            )

        default:
            return(
                ''
            )
    }
}

export default Buttons
