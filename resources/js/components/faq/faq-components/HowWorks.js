import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'

const HowWorks = () => {

    return(
        <div className="faq">
            <div className="faq__desc">
                <h1 className="title blue">Как работает сервис?</h1>
                <p>Сервис EcoPlant | Price4You представляет собой торговую площадку, где пользователь может узнать лучшую стоимость продукта, а поставщик найти надежного клиента.</p>
                <p className="font-weight-bold">Вы выбираете товар-(ы) на сайте ecoplantagro.ru или в личном кабинете на вкладке «Добавить», заполняйте количество и условия сделки. После чего мы рассылаем ваш запрос всем компаниям поставщикам, которые зарегистрированные в системе. И вы получаете предложения из которых выбираете, то что Вам подходит.</p>
            </div>

            <div className="faq__links d-flex justify-content-between">
                <Link className="faq__how-works-link" to="/faq/how-works-company">Как работает сервис для компании</Link>
                <Link className="faq__link" to="/faq">Частые вопросы</Link>
            </div>

            <div className="faq__text">
                <div className="faq__text-unit">
                    <h3 className="blue">Запрос</h3>
                    <p>На вкладке Запрос вам доступны ваши созданные запросы, архив запросов и запросы, которые в процессе формирования.</p>
                </div>
                <div className="faq__text-unit">
                    <h3 className="blue">Предложения</h3>
                    <p>На вкладке Предложения вам доступны поступившие вам предложения на запрос, где вы выбираете цену для согласования сделки.</p>
                </div>
                <div className="faq__text-unit">
                    <h3 className="blue">Уведомления</h3>
                    <p>На вкладке Уведомления вам доступны сообщения от компаний в ответ на запрос для уточнения. Компаниям на вкладке Уведомления доступны сообщения от клиентов, с целью изменения условий или уточнения сделки.</p>
                </div>
            </div>

            <div className="faq__stripes">
                <hr/>
                <hr/>
                <hr/>
            </div>

            <div className="faq__subscription d-flex justify-content-between align-items-center row">
                <p className="col-7">Подписываясь на нашего бота вы в реальном времени будете получать от сервиса EcoPlant | Price4You  предложения для вас и вы не пропустите выгодной цены.</p>
                <div className="d-flex align-items-center justify-content-end col-5">
                    <a href="t.me:/ecoplantagro_bot">t.me:/ecoplantagro_bot</a>
                    <a href="t.me:/ecoplantagro_bot"><img src="/images/social/tg_button.svg"/></a>
                </div>
            </div>
        </div>
    )
}

export default HowWorks
