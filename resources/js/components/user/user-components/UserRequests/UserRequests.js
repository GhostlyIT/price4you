import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {bindActionCreators} from "redux";
import authAction from "../../../../store/actions/authAction";
import {connect} from "react-redux";
import {showNotification} from "../../../../helpers/notifications";
import {getMonthOnRus} from "../../../../helpers/dateConverter";
import {productTypeConverter} from "../../../../helpers/productTypeConverter";
import updateAction from "../../../../store/actions/updateAction";

const UserRequests = (props) => {
    const [requests, setRequests] = useState([]),
        [selectedRequest, setSelectedRequest] = useState(false)

    useEffect(() => {
        let isMounted = true;
        axios.get('/api/request/get-for-user', {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
        .then(response => {
            if (isMounted) setRequests(response.data.requests)
        })
        .catch(error => {
            showNotification('Ошибка', error.response, 'danger')
        })

        return () => { isMounted = false };
    },[props.updateVal])

    const deleteRequest = requestId => {
        axios.delete(`/api/request/${requestId}/delete`,
            {
                headers: {'Authorization': 'Bearer ' + props.token}
            }
        )
        .then(response => {
            showNotification('Мои Запросы', 'Запрос успешно удален', 'success')
            props.updateComponent()
        })
        .catch(error => {
            console.log(error)
            showNotification('Мои Запросы', 'Произошла ошибка при удалении запроса', 'danger')
        })
        .then(() => {
            setSelectedRequest(false)
        })
    }

    const renderRequests = () => {
        return requests.map(request => {
            if (request.products.length > 0) {
                let responsesAmount = 0
                for (let i = 0; i < request.products.length; i++) {
                    responsesAmount += parseInt(request.products[i].responses.length)
                }
                const date = new Date(request.created_at);
                return (
                    <div key={request.id} className="col-xs-12 col-lg-4 mt-4">
                    <span onClick={() => setSelectedRequest(request)}
                          className={`request-picker d-flex flex-column position-relative ${request == selectedRequest ? 'selected' : ''}`}>
                        <span className="request-picker__title">{request.title}</span>
                        <span
                            className="request-picker__title">№ {request.id} от {date.getDate()} {getMonthOnRus(date.getMonth())} {date.getFullYear()}</span>

                            <div className="d-flex position-absolute align-items-center" style={{
                                top: '-12px',
                                right: '-7px'
                            }}>
                                {responsesAmount > 0 &&
                                <span className="amount-badge font-weight-bold">
                                        <span>{responsesAmount}</span>
                                    </span>
                                }
                                <button onClick={() => deleteRequest(request.id)} type="button"
                                        className="remove-btn ml-2"></button>
                            </div>
                    </span>
                    </div>
                )
            }
        })
    }

    const requestInfo = () => {
        return(
            <div className="request-info" style={{boxShadow: "unset"}}>
                <div className="request-info__title position-relative">
                    <hr />
                    <span className="position-absolute">Товары в заявке</span>
                </div>

                <div className="row">
                    {selectedRequest.products.map(product => {
                        const type = product.product_type
                        const responsesAmount = product.responses.length
                        let convertedType = productTypeConverter(type)

                        if (!convertedType) {
                           convertedType = ''
                        }

                        return (
                            <div key={'wrapper-' + product.id} className="col-xs-12 col-lg-4 mt-3">
                                <div key={product.id} className="d-flex justify-content-between align-items-center request-info__product position-relative">
                                    {responsesAmount > 0 &&
                                        <span className="amount-badge position-absolute">
                                            <span>{responsesAmount}</span>
                                        </span>
                                    }

                                    <span className="request-info__product-title d-flex flex-column">
                                        {product[type].name}
                                        <small>{convertedType}</small>
                                    </span>
                                    <span>{product.value} {product.unit}</span>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>

                <div className="request-info__title position-relative mt-5">
                    <hr />
                    <span className="position-absolute">Информация о заявке</span>
                </div>

                <div className="d-flex flex-column">
                    <div className="d-flex">
                        <span className="mr-2 align-items-center font-weight-bold">Способ оплаты:</span>
                        <span>{selectedRequest.payment_method}</span>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <span className="mr-2 font-weight-bold">Способ доставки:</span>
                        <span>{selectedRequest.delivery_method}</span>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <span className="mr-2 font-weight-bold">Регион доставки:</span>
                        <span>{selectedRequest.region.name_regions}</span>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <span className="mr-2 font-weight-bold">Адрес доставки:</span>
                        <span>{selectedRequest.delivery_address}</span>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <span className="mr-2 font-weight-bold">Комментарий к заявке:</span>
                        <span>{selectedRequest.comment}</span>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div key={props.updateVal} className="col-12 requests-wrapper">
            <div className="requests row">
                <div className="d-flex justify-content-center col-12">
                    <h3>Мои запросы</h3>
                </div>
                { requests.length > 0
                    ? renderRequests()
                    : <h1 className="text-center">Запросов нет</h1>
                }
            </div>

            { selectedRequest ? requestInfo() : null }
        </div>
    )
}





const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
        updateVal: store.updateReducer.counter
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch),
        updateComponent: bindActionCreators(updateAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(UserRequests)
