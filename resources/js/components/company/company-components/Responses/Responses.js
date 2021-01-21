import React, {useEffect, useState} from 'react'
import axios from "axios"
import {connect} from "react-redux"
import Response from "./responses-components/Response"
import ContactDataModal from "../../../common/modals/ContactDataModal"
import {getContactData} from "../../../../helpers/userHelper"
import SendMessageModal from "../../../common/modals/SendMessageModal"
import {changeOfferStatus} from "../../../../helpers/offerHelper"
import ConfirmModal from "../../../common/modals/ConfirmModal"
import {bindActionCreators} from "redux";
import updateAction from "../../../../store/actions/updateAction";

const Responses = ({token, updateVal, updateComponent}) => {
    const [responses, setResponses] = useState([]),
        [isContactModalOpen, setContactModelOpen] = useState(false),
        [contactData, setContactData] = useState(null),
        [isMessageModalOpen, setMessageModalOpen] = useState(false),
        [userId, setUserId] = useState(null),
        [isConfirmModalOpen, setConfirmModalOpen] = useState(false),
        [activeResponse, setActiveResponse] = useState(null)

    const showContactData = userId => {
        console.log(userId)
        axios.get(
            '/api/user/contact-data?user_id=' + userId,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        .then(response => {
            setContactData(response.data.contact_data)
            setUserId(userId)
            setContactModelOpen(true)
        })
        .catch(error => {
            console.log(error.response.data.message)
        })
    }

    const closeDeal = responseId => {
        setActiveResponse(responseId)
        setConfirmModalOpen(true)
    }

    useEffect(() => {
        axios.get('/api/response/company/all',
            {
                headers: {Authorization: 'Bearer ' + token}
            }
        )
        .then(response => setResponses(response.data.responses))
        .catch(error => console.log(error.response.data.message))
    }, [updateVal])

    if (responses.length > 0) {
        return(
            <>
                <div className="row requests-wrapper">
                    {
                        responses.map(response => {
                            return(
                                <Response key={response.id}
                                          response={response}
                                          showContactData={showContactData}
                                          closeDeal={closeDeal}
                                />
                            )
                        })
                    }

                </div>

                {contactData != null &&
                    <ContactDataModal
                        closeModalFunc={() => setContactModelOpen(false)}
                        isOpen={isContactModalOpen}
                        modalTitle="Контактные данные"
                        contactData={contactData}
                        writeMessageFunc={() => {
                            setContactModelOpen(false)
                            setMessageModalOpen(true)
                        }}
                    />
                }

                <SendMessageModal
                    isOpen={isMessageModalOpen}
                    closeModalFunc={() => setMessageModalOpen(false)}
                    modalTitle="Написать"
                    recipientId={userId}
                    token={token}
                />

                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    closeModalFunc={() => setConfirmModalOpen(false)}
                    modalTitle="Подтверждение"
                    confirmFunc={() => {
                        changeOfferStatus(token, 'sendToClose', activeResponse)
                        updateComponent()
                    }}
                >
                    <p>Вы уверены что хотите закрыть сделку?</p>
                </ConfirmModal>
            </>
        )
    }

    return(
        <h1>Откликов еще нет</h1>
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

export default connect(mapStateToProps, mapDispatchProps)(Responses)
