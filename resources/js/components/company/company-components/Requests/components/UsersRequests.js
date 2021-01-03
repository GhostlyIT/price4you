import React, {useState, useEffect} from 'react'
import axios from "axios"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import Paginator from "../../../../common/paginator"
import MyModal from "../../../../common/modal"

const UsersRequests = (props) => {
    const [requests, setRequests] = useState([]),
        [requestsCount, setRequestsCount] = useState(0),
        [selectedRequest, setSelectedRequest] = useState(''),
        [isModalOpen, setIsModalOpen] = useState(false),

        [offset, setOffset] = useState(0),
        limit = 9


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


    return (
        <div className="row requests-wrapper">
            {requestsCount > 0
                ? requests.map(request => {
                    const type = request.product_type
                    return (
                        <div key={request.id} className="col-12 col-md-4 request-info d-flex flex-column">
                            <span className="request-picker d-flex justify-content-between align-items-center" style={{height: "16%"}}>
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
                                <span className="mr-2 font-weight-bold">Адрес доставки:</span>
                                <span className="request-info__parameter">{request.request.delivery_address}</span>
                            </div>

                            <div className="d-flex align-items-center flex-wrap mt-3 mb-4">
                                <span className="mr-2 font-weight-bold">Комментарий к заявке:</span>
                                <span className="request-info__parameter">{request.request.comment}</span>
                            </div>

                            <button type="button" className="main-btn mt-auto">Откликнуться</button>

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

            </MyModal>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
    };
}

export default connect(mapStateToProps)(UsersRequests)
