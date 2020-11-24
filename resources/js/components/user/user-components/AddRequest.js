import React from 'react'

const AddRequest = () => {

    return(
        <section id="add-request">
            <h3>Новый запрос</h3>
            <span class="date">№ 124 от 7 сентября 2020</span>

            <hr />

            <div className="d-flex align-items-center">
                <label htmlFor="request-title">Введите название запроса</label>
                <input id="request-title" />
            </div>

            <div className="request-products d-flex flex-column">
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        <input id="request-product" placeholder="Введите товар для запроса" />
                        <div id="request-products" className="falling-list position-absolute"></div>
                    </div>
                    <button type="button">Добавить</button>
                </div>

                <div className="d-flex picked-products"></div>
            </div>
        </section>
    )
}

export default AddRequest
