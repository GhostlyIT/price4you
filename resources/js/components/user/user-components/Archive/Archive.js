import React, {useState, useEffect} from 'react'
import {bindActionCreators} from "redux";
import authAction from "../../../../store/actions/authAction";
import updateAction from "../../../../store/actions/updateAction";
import {connect} from "react-redux";
import axios from "axios";
import {showNotification} from "../../../../helpers/notifications";
import {getMonthOnRus} from "../../../../helpers/dateConverter";
import {productTypeConverter} from "../../../../helpers/productTypeConverter";
import ConfirmModal from "../../../common/modals/ConfirmModal";

const Archive = (props) => {
    const [requests, setRequests] = useState([]),
        [selectedRequest, setSelectedRequest] = useState(false),
        [isConfirmModalOpen, setConfirmModalOpen] = useState(false),
        [selectedForRepeat, setSelectedForRepeat] = useState(null)

    useEffect(() => {
        let isMounted = true;
        axios.get('/api/request/archive', {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then(response => {
                if (isMounted) setRequests(response.data.archive_requests)
            })
            .catch(error => {
                showNotification('Ошибка', error.response, 'danger')
            })

        return () => { isMounted = false };
    },[props.updateVal])

    const openModal = (id) => {
        setSelectedForRepeat(id)
        setConfirmModalOpen(true)
    }

    const renderRequests = () => {
        return requests.map(request => {
            if (request.products.length > 0) {
                const date = new Date(request.created_at);
                return (
                    <div key={request.id} className="col-xs-12 col-lg-4 mt-4 d-flex flex-column align-items-center flex-column">
                        <span onClick={() => setSelectedRequest(request)}
                              className={`request-picker d-flex flex-column position-relative ${request == selectedRequest ? 'selected' : ''}`}>
                            <span className="request-picker__title">{request.title}</span>
                            <span className="request-picker__title">№ {request.id} от {date.getDate()} {getMonthOnRus(date.getMonth())} {date.getFullYear()}</span>
                        </span>
                    </div>
                )
            }
        })
    }

    const repeat = id => {
        axios.patch(`/api/request/${id}/repeat`, {}, {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
        .then(() => showNotification('Повтор запроса', 'Ваш запрос снова активен', 'success'))
        .catch(() => showNotification('Повтор запроса', 'Произошла ошибка', 'danger'))
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
                        let convertedType = productTypeConverter(type)

                        if (!convertedType) {
                            convertedType = ''
                        }

                        return (
                            <div key={'wrapper-' + product.id} className="col-xs-12 col-lg-4 mt-3 d-flex justify-content-center align-items-center flex-column">
                                <div key={product.id} className="w-100 d-flex justify-content-between align-items-center request-info__product position-relative">

                                    <span className="request-info__product-title d-flex flex-column">
                                        {product[type].name}
                                        <small>{convertedType}</small>
                                    </span>
                                    <span>{product.value} {product.unit}</span>
                                </div>

                                <button onClick={() => openModal(product.id)} type="button" className="main-btn mt-2">Повторить</button>
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
                    <h3>Архив запросов</h3>
                </div>
                { requests.length > 0
                    ? renderRequests()
                    : <h1 className="text-center">Запросов нет</h1>
                }
            </div>

            { selectedRequest ? requestInfo() : null }

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                closeModalFunc={() => setConfirmModalOpen(false)}
                modalTitle="Повторить запрос"
                confirmFunc={() => {
                    repeat(selectedForRepeat)
                    setSelectedRequest(false)
                    props.updateComponent()
                }}
            >
                <p>
                    Вы уверены, что хотите повторить запрос?
                </p>
            </ConfirmModal>
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

export default connect(mapStateToProps, mapDispatchProps)(Archive)
