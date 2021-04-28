import React, {useEffect, useState} from 'react'
import axios from "axios"
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import updateAction from "../../../../store/actions/updateAction";
import {normalizePrice} from "../../../../helpers/priceNormalizer";
import {changeArchiveFilter} from "./archive-queries";

const Archive = ({token, updateVal, updateComponent}) => {
    const [responses, setResponses] = useState([])

    useEffect(() => {
        axios.get('/api/response/archive/all',
            {
                headers: {Authorization: 'Bearer ' + token}
            }
        )
        .then(response => setResponses(response.data.responses))
        .catch(error => console.log(error.response.data.message))
    }, [updateVal])

    const renderResponses = () => {
        if (responses.length > 0) {
            return responses.map(response => {
                if (response.product_info) {
                    const type = response.product_info.product_type
                    let status = '';
                    if (response.status === 'closed') {
                        status = 'Принят'
                    } else if (response.status === 'rejected') {
                        status = 'Отклонен'
                    }
                    return (
                        <div key={response.id} className="col-12 col-md-4 request-info d-flex flex-column">
                                    <span className="request-picker d-flex justify-content-between align-items-center">
                                        <span
                                            className="request-picker__title">{response.product_info[type].name}</span>
                                        <span
                                            className="request-picker__title">{response.product_info.value} {response.product_info.unit}</span>
                                    </span>

                            <div className="request-info__title position-relative mt-5">
                                <hr/>
                                <span className="position-absolute" style={{top: "15px"}}>Параметры</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap">
                                <span className="mr-2 font-weight-bold">Способ оплаты:</span>
                                <span
                                    className="request-info__parameter">{response.request.payment_method}</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap mt-3">
                                <span className="mr-2 font-weight-bold">Способ доставки:</span>
                                <span
                                    className="request-info__parameter">{response.request.delivery_method}</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap mt-3">
                                <span className="mr-2 font-weight-bold">Адрес доставки:</span>
                                <span
                                    className="request-info__parameter">{response.request.delivery_address}</span>
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
                                <span
                                    className="request-info__parameter">{normalizePrice(response.price * response.product_info.value)} руб.</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap mt-3">
                                <span className="mr-2 font-weight-bold">Статус:</span>
                                <span className="request-info__parameter">{status}</span>
                            </div>
                        </div>
                    )
                }
            })
        } else {
            return <h4>Архив пуст</h4>
        }
    }


    return(
        <>
            <div className="row requests-wrapper">
                <div className="d-flex col-12 align-items-center archive-filter">
                    <h3>Архив откликов:</h3>
                    <button onClick={e => changeArchiveFilter('all', e.currentTarget, token, setResponses)} className="ml-3 archive-btn secondary-btn active">Все</button>
                    <button onClick={e => changeArchiveFilter('rejected', e.currentTarget, token, setResponses)} className="ml-3 archive-btn secondary-btn">Отклоненные</button>
                    <button onClick={e => changeArchiveFilter('closed', e.currentTarget, token, setResponses)} className="ml-3 archive-btn secondary-btn">Принятые</button>
                </div>
                { renderResponses() }
            </div>
        </>
    )

    return(
        <h1>Архив пуст</h1>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
        updateVal: store.updateReducer.counter
    }
}

const mapDispatchProps = dispatch => {
    return {
        updateComponent: bindActionCreators(updateAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Archive)
