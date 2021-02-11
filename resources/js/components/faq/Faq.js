import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch} from 'react-router-dom'
import HowWorks from './faq-components/HowWorks'
import HowWorksCompany from './faq-components/HowWorksCompany'

const Faq = () => {
    const match = useRouteMatch();
    return (
        <div className="faq">

                <Route path={`${match.url}/how-works`}>
                    <HowWorks/>
                </Route>
                <Route path={`${match.url}/how-works-company`}>
                    <HowWorksCompany/>
                </Route>
                <Route exact path={match.url}>
                    <div>
                        <h1 className="text-center mb-4">Частые вопросы</h1>
                        <div className="d-flex flex-column faq__list">
                            <a href="#role">Какова роль компании EcoPlant в сделке?</a>
                            <a href="#is-free">Это бесплатно?</a>
                            <a href="#how-to-order">Как оставить запрос?</a>
                            <a href="#why-post-phone-number">Зачем указывать номер телефона при регистрации?</a>
                            <a href="#how-to-chose-company">Как выбрать компанию? Почему я должен смотреть на рейтинг?</a>
                            <a href="#is-ecoplant-guarantee">Отвечает ли EcoPlant за деятельность компании на сервисе Price4You?</a>
                            <a href="#is-contract-needed">Надо ли заключать договор?</a>
                            <a href="#how-to-feedback">Как оставить отзыв?</a>
                            <a href="#dissatisfied-with-work">Я недоволен(льна) работой компании, что делать?</a>
                            <a href="#cancel-order">Как отменить запрос?</a>
                        </div>
                    </div>

                    <div className="faq__support d-flex justify-content-center">
                        <p>Если вы не нашли ответа на свой вопрос задайте его службе поддержки <a href="mailto:info@ecoplant.org">info@ecoplant.org</a></p>
                    </div>

                    <div className="faq__text">
                        <div className="faq__text-unit" id="role">
                            <h3 className="blue">Какова роль компании EcoPlant в сделке?</h3>
                            <p>
                                Компания EcoPlant является разработчиком сервиса Price4You и не осуществляет продажу
                                товаров. Мы передаем ваши запросы анонимно компаниям, которые осуществляют торговую
                                деятельность на территории РФ и зарегистрированы в системе Price4You
                            </p>
                        </div>
                        <div className="faq__text-unit" id="is-free">
                            <h3 className="blue">Это бесплатно?</h3>
                            <p>
                                Да, если вы подаете запросы на поиск лучшей цены товара.
                            </p>
                            <p>
                                Нет, если вы представляете компанию и хотите отвечать на поступающие запросы от
                                пользователей системы Price4You. Компании могут познакомиться с тарифами здесь.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="how-to-order">
                            <h3 className="blue">Как оставить запрос?</h3>
                            <p>
                                Если вы зарегистрированный пользователь, то все очень просто. В правой части рабочего
                                окна, в меню ссылок, выберите <span className="text-green">Добавить запрос.</span> В новом запросе укажите искомые товары
                                (один и более), выберите способ оплаты и доставку. Кнопка Отправить передаст ваш запрос
                                всем компаниям зарегистрированным в системе Price4You
                            </p>
                        </div>
                        <div className="faq__text-unit" id="why-post-phone-number">
                            <h3 className="blue">Зачем указывать номер телефона при регистрации?</h3>
                            <p>
                                Вы запросили цены, вам ответили. Вы выбрали выгодное предложение и нажали кнопку Принять.
                                Менеджер компании, которая отправила предложение должен связаться с Вами, чтобы обсудить
                                все детали сделки. Вот для этого вы и указывали свой номер телефона. Мы не показываем
                                ваш номер телефона больше никому и не станем вам присылать рекламные СМС.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="how-to-chose-company">
                            <h3 className="blue">Как выбрать компанию? Почему я должен смотреть на рейтинг?</h3>
                            <p>
                                Вы отправили запрос. Вам ответили. Вас устраивает несколько предложений, но кто их
                                отправил вы не знаете. Как определиться? Вот теперь о рейтинге. Компании с низким
                                рейтингом очень часто изменяют свое предложение в момент подписания договора с клиентом.
                                Клиенты недовольны и ставят низкую оценку компании и предложению.  И наоборот, клиенты
                                оценивают высоко компанию, если их все устроило. Рейтинг формируем мы сами на основании
                                ваших отзывов.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="is-ecoplant-guarantee">
                            <h3 className="blue">Отвечает ли EcoPlant за деятельность компании на сервисе Price4You?</h3>
                            <p>
                                Сервис Price4You является интернет-площадкой по подбору выгодных предложений. Мы не несем
                                отвественности за коммерческую деятельность компаний, зарегистрированных в нашей системе.
                                Компании работают на себя и сами отвечают за свою работу. Менеджеры компаний не являются
                                сотрудниками EcoPlant. Мы анализируем только поведение пользователей и формируем рейтинги
                                как покупателей, так и поставщиков. Если компания часто получает негативные отзывы,
                                мы удаляем ее из системы.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="is-contract-needed">
                            <h3 className="blue">Надо ли заключать договор?</h3>
                            <p>
                                <p>
                                    Компания EcoPlant заключает договора на доступ к сервису Price4You только с
                                    дистрибъюторскими компаниями и производителями продукции, которые выбрали нашу площадку
                                    для торговли своими товарами.
                                </p>
                                <p>
                                    После получения звонка от менеджера мы рекомендуем работать с поставщиком по договору.
                                    Это отличная профилактика разногласий и спорных ситуаций.
                                </p>
                            </p>
                        </div>
                        <div className="faq__text-unit" id="how-to-feedback">
                            <h3 className="blue">Как выбрать компанию? Почему я должен смотреть на рейтинг.</h3>
                            <p>
                                Вы отправили запрос. Вам ответили. Вас устраивает несколько предложений, но кто их
                                отправил вы не знаете. Как определиться? Вот теперь о рейтинге. Компании с низким
                                рейтингом очень часто изменяют свое предложение в момент подписания договора с клиентом.
                                Клиенты недовольны и ставят низкую оценку компании и предложению.  И наоборот, клиенты
                                оценивают высоко компанию, если их все устроило. Рейтинг формируем мы сами на основании
                                ваших отзывов.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="dissatisfied-with-work">
                            <h3 className="blue">Я недоволен(льна) работой компании, что делать?</h3>
                            <p>Сообщите в поддержку info@ecoplant.org. Мы разберемся с неприятностями.</p>
                            <ol>
                                <li>Выслушаем вашу проблему. Не оставим вас в сложной ситуации.</li>
                                <li>Изучим доказательства. В спорах помогают договоры, расписки, фотографии.</li>
                                <li>Свяжемся с компанией. Спросим ее точку зрения.</li>
                                <li>Попросим компанию исправить недостатки, если факты на вашей стороне.</li>
                            </ol>
                        </div>
                        <div className="faq__text-unit" id="cancel-order">
                            <h3 className="blue">Как отменить запрос?</h3>
                            <p>
                                Если Вы ошиблись в создании запроса, не волнуйтесь, Вы всегда его можете удалить.
                            </p>
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
                </Route>
        </div>
    )
}

export default Faq
