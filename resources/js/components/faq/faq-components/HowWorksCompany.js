import React from 'react'
import {Link} from 'react-router-dom'

const HowWorksCompany = () => {

    return(
        <div className="faq">
            <div className="faq__desc">
                <h1 className="blue">Как работает сервис для компании?</h1>
                <p>
                    Сервис Price4You предназначен для поиска новых клиентов на средства защиты растений, семян и
                    удобрений из разных регионов России, которые зарегистрированы в системе Price4You.
                </p>
            </div>

            <div className="faq__links d-flex justify-content-around">
                <Link className="faq__how-works-link" to="/faq/how-works">Как работает сервис</Link>
                <Link className="faq__link" to="/faq">Частые вопросы</Link>
                <a className="faq__price-link" href="#price">Сколько стоит</a>
            </div>

            <div className="faq__text">
                <div className="faq__text-unit">
                    <h3 className="blue">Шаг 1. Как зарегистрироваться на Price4You?</h3>
                    <div className="row">
                        <div className="col-12">
                            <p>
                                Регистрация компании Price4You бесплатна
                                и находится на главной странице
                                — p4u.ecoplantagro.ru
                            </p>
                            <p>
                                Пожалуйста, помните, что при регистрации
                                новой страницы нужно указывать номер
                                телефона.
                            </p>
                            <p>
                                Рекомендуем отказаться от использования виртуальных номеров при регистрации – такой
                                способ запрещен политикой пользования сервисом Price4You.
                                Так же при регистрации необходимо указать свой электронный адрес, на который будут
                                поступать уведомления при поступление новых запросы от клиентов.
                                Так же с целью подтверждения участия в ответах клиентам от лица компании, Вам необходимо
                                указать электронный адрес руководителя, на который будет выслано письмо от сервиса
                                Price4You, для уведомления.
                            </p>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <img src="/images/faq/register_company.jpg" />
                        </div>
                    </div>

                </div>
                <div className="faq__text-unit">
                    <h3 className="blue">Шаг 2. Запросы</h3>
                    <div className="row">
                        <div className="col-12">
                            <p>
                                В разделе Запрос сервиса Price4You Вам
                                поступают запросы на получение от Вас
                                предложений по цене на товар, согласно
                                указанным условиям. Вы выбираете запрос,
                                который Вам подходит, даете свой ответ
                                по цене и можете указать комментарий. Комментарий - это любой текст, который поможет клиенту
                                лучше понять Вас. Ваш ответ является анонимным и клиент не видит ваших контактных данных и
                                название компании.
                            </p>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <img src="/images/faq/requests.jpg" />
                        </div>
                    </div>

                </div>
                <div className="faq__text-unit">
                    <h3 className="blue">Шаг 3. Отклики</h3>
                    <div className="row">
                        <div className="col-12">
                            <p>
                                В разделе Отклики Вы можете увидеть
                                запросы, на которые клиент Вам ответил
                                положительно и ожидает от Вас звонка
                                для уточнения или заключения сделки.
                                Внимание, если на указанные номер вы
                                не смогли дозвониться, просим нам
                                это указать в службу поддержки и мы примем меры.
                            </p>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <img src="/images/faq/responses.jpg" />
                        </div>
                    </div>
                </div>
                <div className="faq__text-unit">
                    <h3 className="blue">Описание функционала кнопок сообщения, данные компании и настройки.</h3>
                    <p>
                        В разделе сообщения, хранится Ваша переписка с клиентом, Вы можете удалить её или написать заново.
                    </p>
                    <p>
                        В разделе данные компании, Вы можете отредактировать свой электронный адрес, добавить/изменить
                        логотип компании, редактировать свой номер телефона. Внимание, при жалобе от клиентов на Вас мы
                        вправе заблокировать ваш аккаунт, пока не разберемся в ситуации. Поэтому просим указывать цены,
                        по которым Вы готовы продать товар.
                    </p>
                    <p>
                        В разделе настройки, вы настраивайте видимость вашей компании и формируете список производителей,
                        препаратов которыми торгуете, а так же указываете Ваши регионы в которых торгуете. Внимание,
                        все остальные запросы не соответствующие Вашим характеристикам не будут Вам поступать.
                    </p>
                </div>
            </div>

            <h1 className="blue mt-5" id="price">Стоимость</h1>

            <p className="mt-3 mb-3">
                В течение суток Вам поступают запросы, на которые Вы можете ответить, согласно
                вашему трафику доступа ответов. Если вы не оплатили доступ, тогда каждый ответ необходимо
            </p>

            <div className="faq__cards">
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>150</h2>
                        <p>₽/ответ</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «1 ответ»</h4>
                        <p>
                            Вы платите за каждый ответ.
                        </p>
                    </div>
                </div>
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>22 500</h2>
                        <p>₽/месяц</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «10 ответов в день»</h4>
                        <p>
                            Вы можете отвечать на 10  выбранных Вами запросов, каждый день в течение месяца.
                        </p>
                    </div>
                </div>
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>50 000</h2>
                        <p>₽/месяц</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «50 ответов в день»</h4>
                        <p>
                            Вы можете отвечать на 50  выбранных Вами запросов, каждый день в течение месяца.
                        </p>
                    </div>
                </div>
                <div className="faq__card d-flex align-items-center">
                    <div className="faq__card-price d-flex flex-column justify-content-center align-items-center">
                        <h2>100 000</h2>
                        <p>₽/месяц</p>
                    </div>
                    <div className="faq__card-text">
                        <h4>Доступ «Без ограничений»</h4>
                        <p>
                            Вы можете отвечать неограниченное количество раз на выбранные Вами запросы, каждый день в течение месяца.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowWorksCompany
