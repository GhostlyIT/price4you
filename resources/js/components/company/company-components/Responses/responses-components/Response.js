import React from 'react'
import {getTextForStatus} from "../../../../../helpers/offerHelper"
import Buttons from "./Buttons"
import {normalizePrice} from "../../../../../helpers/priceNormalizer"

const Response = ({response, showContactData, closeDeal}) => {
    const type = response.product_info.product_type

    const actions = {
        showContacts: () => showContactData(response.request.user_id),
        closeDeal: () => closeDeal(response.id)
    }

    return (
        <div key={response.id} className="col-12 col-md-4 request-info d-flex flex-column">
            <span className="request-picker d-flex justify-content-between align-items-center">
                <span className="request-picker__title">{response.product_info[type].name}</span>
                <span className="request-picker__title">{response.product_info.value} {response.product_info.unit}</span>
            </span>

            <div className="request-info__title position-relative mt-5">
                <hr />
                <span className="position-absolute" style={{top: "15px"}}>Параметры</span>
            </div>

            <div className="d-flex align-items-center flex-wrap">
                <span className="mr-2 font-weight-bold">Способ оплаты:</span>
                <span className="request-info__parameter">{response.request.payment_method}</span>
            </div>

            <div className="d-flex align-items-center flex-wrap mt-3">
                <span className="mr-2 font-weight-bold">Способ доставки:</span>
                <span className="request-info__parameter">{response.request.delivery_method}</span>
            </div>

            <div className="d-flex align-items-center flex-wrap mt-3">
                <span className="mr-2 font-weight-bold">Адрес доставки:</span>
                <span className="request-info__parameter">{response.request.delivery_address}</span>
            </div>

            <div className="d-flex align-items-center flex-wrap mt-3">
                <span className="mr-2 font-weight-bold">Комментарий к заявке:</span>
                <span className="request-info__parameter">{response.request.comment}</span>
            </div>

            <div className="d-flex align-items-center flex-wrap mt-3">
                <span className="mr-2 font-weight-bold">Ваш комментарий в отклике:</span>
                <span className="request-info__parameter">{response.comment}</span>
            </div>

            <div className="d-flex align-items-center flex-wrap mt-3 mb-4">
                <span className="mr-2 font-weight-bold">Итоговая цена:</span>
                <span className="request-info__parameter">{normalizePrice(response.price * response.product_info.value)} руб.</span>
            </div>

            <span className="info-message mb-4">{getTextForStatus(response.status)}</span>

            <Buttons status={response.status} actions={actions} />
        </div>
    )
}

export default Response
