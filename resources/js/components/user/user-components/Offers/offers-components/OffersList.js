import React from 'react'

const OffersList = ({offers, openMessageModal}) => {
    if (offers.length > 0) {
        return offers.map(offer => {
            const price = offer.price
            const companyComment = offer.comment
            const productType = offer.product_info.product_type
            const productName = offer.product_info[productType].name
            const unit = offer.product_info.unit
            const value = offer.product_info.value
            const userComment = offer.request.comment
            const paymentMethod = offer.request.payment_method
            const deliveryMethod = offer.request.delivery_method
            const deliveryAddress = offer.request.delivery_address
            const totalPrice = parseInt(price) * parseInt(value)
            const recipientId = offer.company.user_id

            return(
                <div key={offer.id} className="col-12 col-md-4 request-info d-flex flex-column mt-4">
                    <span className="request-picker d-flex justify-content-between align-items-center" style={{height: "16%"}}>
                        <span className="request-picker__title">{productName}</span>
                        <span className="request-picker__title">{price} руб. / {unit}</span>
                    </span>

                    <div className="request-info__title position-relative mt-4">
                        <hr />
                        <span className="position-absolute" style={{top: "15px"}}>Параметры</span>
                    </div>

                    <div className="d-flex align-items-center flex-wrap">
                        <span className="mr-2 font-weight-bold">Способ оплаты:</span>
                        <span className="request-info__parameter">{paymentMethod}</span>
                    </div>

                    <div className="d-flex align-items-center flex-wrap mt-3">
                        <span className="mr-2 font-weight-bold">Способ доставки:</span>
                        <span className="request-info__parameter">{deliveryMethod}</span>
                    </div>

                    <div className="d-flex align-items-center flex-wrap mt-3">
                        <span className="mr-2 font-weight-bold">Адрес доставки:</span>
                        <span className="request-info__parameter">{deliveryAddress}</span>
                    </div>

                    <div className="d-flex align-items-center flex-wrap mt-3">
                        <span className="mr-2 font-weight-bold">Ваш комментарий к заявке:</span>
                        <span className="request-info__parameter">{userComment}</span>
                    </div>

                    <div className="d-flex align-items-center flex-wrap mt-3">
                        <span className="mr-2 font-weight-bold">Комментарий компании к заявке:</span>
                        <span className="request-info__parameter">{companyComment}</span>
                    </div>

                    <div className="d-flex align-items-center flex-wrap mt-3">
                        <span className="mr-2 font-weight-bold">Количество:</span>
                        <span className="request-info__parameter">{value}</span>
                    </div>

                    <div className="d-flex align-items-center flex-wrap mt-3 mb-4">
                        <span className="mr-2 font-weight-bold">Итоговая цена:</span>
                        <span className="request-info__parameter">{totalPrice} руб.</span>
                    </div>

                    <div className="d-flex flex-column mt-auto">
                        <button onClick={() => openMessageModal(recipientId)} type="button" className="secondary-btn mb-3">Написать</button>
                        <button type="button" className="main-btn">Выслать контакты</button>
                    </div>
                </div>
            )
        })
    }
    return (
        <h1>Предложений не найдено</h1>
    )
}

export default OffersList
