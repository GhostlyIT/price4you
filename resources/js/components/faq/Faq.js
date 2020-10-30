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
                            <a href="#how-service-works-for-companies">Как работает сервис для компаний?</a>
                            <a href="#is-free">Это бесплатно?</a>
                            <a href="#how-to-order">Как оставить запрос?</a>
                            <a href="#why-post-phone-number">Зачем оставлять номер телефона?</a>
                            <a href="#how-to-chose-company">Как выбрать компанию? Отзывы, рейтинг</a>
                            <a href="#is-ecoplant-guarantee">Отвечает ли EcoPlant за компании?</a>
                            <a href="#is-contract-needed">Нужно ли заключать договор?</a>
                            <a href="#how-to-feedback">Как оставить отзыв?</a>
                            <a href="#dissatisfied-with-work">Я недоволен(льна) работой компании, что делать?</a>
                            <a href="#edit-order">Как отредактировать запрос?</a>
                            <a href="#cancel-order">Как отменить запрос?</a>
                            <a href="#edit-account">Как отредактировать свои данные?</a>
                        </div>
                    </div>

                    <div className="faq__support d-flex justify-content-center">
                        <p>Если вы не нашли ответа на свой вопрос задайте его службе поддержки <a href="mailto:info@ecoplant.org">info@ecoplant.org</a></p>
                    </div>

                    <div className="faq__text">
                        <div className="faq__text-unit" id="how-service-works-for-companies">
                            <h3 className="blue">Как работает сервис для компаний?</h3>
                            <p>
                                Вы выбираете товар, заполняете объем, сроки поставки, условия оплаты и доставки.
                                Компании видят ваш запрос и отправляют предложения с ценой. Когда выберете
                                подходящее условие купли товара, вы Обменивайтесь реквизитами и контактами,
                                с целью заключения договора. После завершения запроса оставьте отзыв о
                                работе с компанией - это поможет сделать выбор другим клиентам.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="is-free">
                            <h3 className="blue">Это бесплатно?</h3>
                            <p>
                                Поиск наилучшего предложения по цене бесплатно. Вы платите только за товар
                                Напрямую компании. Компании платят EcoPlant небольшую сумму за
                                возможность  предложить вам свои цены.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="how-to-order">
                            <h3 className="blue">Как оставить запрос?</h3>
                            <p>
                                Выберите товар в списке, во вкладке <span className="text-green">Добавить</span> или найдите через
                                сайт <span className="text-green">ecoplantagro.ru.</span> Вы увидеть во вкладке <span className="text-green">Запросы</span> уточняющие вопросы
                                (количество, способы оплаты, доставка). После Ваших ответов на вопросы, Ваш запрос
                                будет отправлен всем компаниям зарегистрированным в системе EcoPlant|Price4You
                            </p>
                        </div>
                        <div className="faq__text-unit" id="why-post-phone-number">
                            <h3 className="blue">Зачем оставлять номер телефона?</h3>
                            <p>
                                Чтобы компания могла вам позвонить, если вы ее выберите. Мы не показываем ваш номер телефона больше никому и не станем вам присылать рекламные СМС.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="how-to-chose-company">
                            <h3 className="blue">Как выбрать компанию? Отзывы, рейтинг</h3>
                            <p>
                                Компании пришлют вам ответ на ваш запрос с ценой. Вам останется только выбрать
                                подходящее предложение и приобрести. Отзывы пишут клиенты, которые уже приобрели
                                товар. Без запроса оставить отзыв невозможно. Убедитесь, что в анкете компании есть нужный вам товар и положительные отзывы. Рейтинг формируем мы сами. Он зависит от
                                количества совершенных сделок, положительных отзывов, пунктуальности, ответственности и репутации компании.
                            </p>
                            <p>Анкета - визитная карточка компании.  Обращайте внимание на отзывы о компании, их ассортименте. Вы можете написать компании для уточнения вопросов.</p>
                        </div>
                        <div className="faq__text-unit" id="is-ecoplant-guarantee">
                            <h3 className="blue">Отвечает ли EcoPlant за компании?</h3>
                            <p>
                                Компании работают на себя и сами отвечают за свою работу. Они не являются сотрудниками
                                EcoPlant. Мы следим за качеством анкет на сайте, подлинностью отзывов. Если компания
                                часто получает негативные отзывы, мы удаляем ее анкету.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="is-contract-needed">
                            <h3 className="blue">Надо ли заключать договор?</h3>
                            <p>
                                Мы рекомендуем работать по договору. Это отличная профилактика разногласий и спорных ситуаций.
                            </p>
                        </div>
                        <div className="faq__text-unit" id="how-to-feedback">
                            <h3 className="blue">Как оставить отзыв?</h3>
                            <p>
                                После закрытия запроса, через неделю у вас появится кнопка Оставить отзыв компании.
                                Поставьте  оценку и напишите комментарий. Мы публикуем все отзывы - как позитивные, так
                                и негативные. Главное, чтобы в них не было личных оскорблений или нецензурных слов.
                                Компании могут ответить на вам отзыв. Ее ответ мы тоже открыто публикуем.
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
                        <div className="faq__text-unit" id="edit-order">
                            <h3 className="blue">Как отредактировать запрос?</h3>
                            <p>Перейти во вкладку Мои запросы и нажать справо напротив имени запроса на ред.</p>
                        </div>
                        <div className="faq__text-unit" id="cancel-order">
                            <h3 className="blue">Как отменить запрос?</h3>
                            <p>Перейдите во вкладку Мои запросы. Нажмите на значок ред. справо от имени запроса который хотите отменить внизу страницы будет доступна кнопка Отменить запроса.</p>
                        </div>
                        <div className="faq__text-unit" id="cancel-order">
                            <h3 className="blue">Как отредактировать свои данные?</h3>
                            <p>
                                Для клиента: Нажмите на свое имя в шапке сайте и вы будете переправлены на свою личную
                                страницу, где можете отредактировать свои данные, поменять фотографию, загрузить или
                                изменить реквизиты, Изменить настройки видимости.
                                Для компаний: Нажмите на свое имя в шапке сайте и вы будете переправлены на свою личную
                                страницу компании, где можете отредактировать данные компании, сотрудников,  поменять
                                фотографию, загрузить или изменить товары, изменить настройки видимости, регионы и
                                список товаров по которым вы желаете получать запросы.
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
