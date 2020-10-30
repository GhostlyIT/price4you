import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'

const HowWorksCompany = () => {

    return(
        <div className="faq">
            <div className="faq__desc">
                <h1 className="blue">Как работает сервис для компании?</h1>
                <p>В личном кабинете Вам поступают запросы, смотреть их можно во вкладке «Запросы». Вы отвечаете на интересующие Вас запросы, ответ состоит в стоимости и комментария. После того, как клиент одобрил Ваше предложение, Вам поступить его личный номер телефона и реквизиты для согласования сделки.</p>
            </div>

            <div className="faq__links d-flex justify-content-around">
                <Link className="faq__how-works-link" to="/faq/how-works">Как работает сервис</Link>
                <Link className="faq__link" to="/faq">Частые вопросы</Link>
                <Link className="faq__price-link" to="/faq/price">Сколько стоит</Link>
            </div>

            <p className="mt-3 mb-3">В течение суток бесплатно можно получить одну строку запроса с наименованием товара (препарата, семян,  удобрений и тд). Если Вам необходимо получать большее количество запросов, тогда необходимо приобрести доступ на месяц, смотреть предложения вы можете ниже.</p>

            <div className="faq__cards">
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>5</h2>
                        <p>₽/строка</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «1 строка»</h4>
                        <p>Вы платите за каждую поступающую строку в день, в зависимости от количества баланса, соответствующую Вашим параметрам и настройкам.</p>
                    </div>
                </div>
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>5000</h2>
                        <p>₽/месяц</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «10 в день»</h4>
                        <p>Увеличивает количество поступающий строк наименований препаратов, семян или удобрений до 10 строк в день.</p>
                    </div>
                </div>
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>25000</h2>
                        <p>₽/месяц</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «50 в день»</h4>
                        <p>Увеличивает количество поступающий строк наименований препаратов, семян или удобрений до 50 строк в день.</p>
                    </div>
                </div>
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>50000</h2>
                        <p>₽/месяц</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «100 в день»</h4>
                        <p>Увеличивает количество поступающий строк наименований препаратов, семян или удобрений до 100 строк в день.</p>
                    </div>
                </div>
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>100000</h2>
                        <p>₽/месяц</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «VIP»</h4>
                        <p>Неограничивает количество поступающий строк наименований препаратов, семян или удобрений в день.</p>
                    </div>
                </div>
            </div>

            <div className="faq__text">
                <div className="faq__text-unit">
                    <h3 className="blue">Компания</h3>
                    <p>На вкладке Запрос вам доступны ваши созданные запросы, архив запросов и запросы, которые в процессе формирования.</p>
                </div>
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

export default HowWorksCompany
