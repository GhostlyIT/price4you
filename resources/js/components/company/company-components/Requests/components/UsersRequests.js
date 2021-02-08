import React, {useState, useEffect} from 'react'
import axios from "axios"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import Paginator from "../../../../common/paginator"
import MyModal from "../../../../common/modal"
import {showNotification} from "../../../../../helpers/notifications";

const UsersRequests = (props) => {
    const [requests, setRequests] = useState([]),
        [requestsCount, setRequestsCount] = useState(0),
        [selectedRequest, setSelectedRequest] = useState(false),
        [isModalOpen, setIsModalOpen] = useState(false)

    const offset = 0
    const limit = 9


    const getRequests = (offset = offset) => {
        axios.get(`/api/request/get-for-company?offset=${offset}&limit=${limit}`, {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
        .then(response => {
            setRequests(response.data.requests)
            setRequestsCount(response.data.requests_count)
        })
        .catch(error => {
            console.log(error.response.data.message)
        })
    }


    const renderModal = () => {
        if (selectedRequest) {
            const type = selectedRequest.product_type
            let comment = null
            let price = 0

            const saveResponse = () => {
                axios.post('/api/response/add',
                    {
                        request_id: selectedRequest.id,
                        price: price,
                        comment: comment
                    },
                    {
                        headers: {'Authorization': 'Bearer ' + props.token}
                    }
                )
                .then(response => {
                    getRequests(offset)
                    setIsModalOpen(false)
                    showNotification('Отклик', response.data.message, 'success')
                })
                .catch(error => {
                    console.log(error.response.data.message)
                    showNotification('Отклик', 'Произошла ошибка. Попробуйте еще раз.', 'danger')
                })
            }

            return (
                <div className="modal__body">
                    <div className="modal__element d-flex justify-content-center">
                        <span className="mr-3">{selectedRequest[type].name}</span>
                        <span>{selectedRequest.value} {selectedRequest.unit} ({selectedRequest[type].tara_middleware.tara.tara_name})</span>
                    </div>
                    <div className="modal__element">
                        <input onChange={(e) => price = e.target.value} type="number" min="0" placeholder={`Ваша цена за ${selectedRequest.unit} товара`}/>
                    </div>
                    <div className="modal__element">
                        <textarea onChange={(e) => comment = e.target.value} placeholder="Ваш комментарий"></textarea>
                    </div>
                    <div className="modal__element">
                        <button onClick={() => saveResponse()} className="main-btn">Отправить отклик</button>
                    </div>
                </div>
            )
        }

        return null
    }


    return (
        <div className="row requests-wrapper">
            {requestsCount > 0
                ? requests.map(request => {
                    const type = request.product_type
                    return (
                        <div key={request.id} className="col-12 col-md-4 request-info d-flex flex-column">
                            <span className="request-picker d-flex justify-content-between align-items-center">
                                <span className="request-picker__title">{request[type].name}</span>
                                <span className="request-picker__title">{request.value} {request.unit}</span>
                            </span>

                            <div className="request-info__title position-relative mt-5">
                                <hr />
                                <span className="position-absolute" style={{top: "15px"}}>Параметры</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap">
                                <span className="mr-2 font-weight-bold">Способ оплаты:</span>
                                <span className="request-info__parameter">{request.request.payment_method}</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap mt-3">
                                <span className="mr-2 font-weight-bold">Способ доставки:</span>
                                <span className="request-info__parameter">{request.request.delivery_method}</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap mt-3">
                                <span className="mr-2 font-weight-bold">Регион доставки:</span>
                                <span className="request-info__parameter">{request.request.region.name_regions}</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap mt-3">
                                <span className="mr-2 font-weight-bold">Адрес доставки:</span>
                                <span className="request-info__parameter">{request.request.delivery_address}</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap mt-3 mb-4">
                                <span className="mr-2 font-weight-bold">Комментарий к заявке:</span>
                                <span className="request-info__parameter">{request.request.comment}</span>
                            </div>

                            { request.responses.findIndex(response => response.company_id == props.userData.company.id) == -1
                                ?
                                    <button
                                        onClick={() => {
                                            setSelectedRequest(request)
                                            setIsModalOpen(true)
                                        }}
                                        type="button"
                                        className="main-btn mt-auto"
                                    >
                                        Откликнуться
                                    </button>
                                :
                                    <button
                                        type="button"
                                        className="main-btn mt-auto"
                                        disabled
                                    >
                                        Вы уже откликнулись
                                    </button>
                            }
                        </div>
                    )
                })
                : <h1>Запросов нет</h1>
            }

            <Paginator
                totalItemsAmount={requestsCount}
                itemsOnPageAmount={limit}
                getItemsFunc={getRequests}
            />

            <MyModal
                 isOpen={isModalOpen}
                 closeModal={() => setIsModalOpen(false)}
                 modalTitle="Отправить отклик на запрос"
            >
                { renderModal() }
            </MyModal>
        </div>
    )
}


const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
        userData: store.authReducer.userData
    };
}


export default connect(mapStateToProps)(UsersRequests)
