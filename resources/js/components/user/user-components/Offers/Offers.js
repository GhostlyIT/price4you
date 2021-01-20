import React, {useState, useEffect, useCallback} from 'react'
import axios from "axios"
import {connect} from "react-redux"
import OffersList from "./offers-components/OffersList"
import SendMessageModal from "../../../common/modals/SendMessageModal"
import ConfirmModal from "../../../common/modals/ConfirmModal"
import {changeOfferStatus} from "../../../../helpers/offerHelper"
import {bindActionCreators} from "redux";
import updateAction from "../../../../store/actions/updateAction"

const Offers = (props) => {
    const [offers, setOffers] = useState([]),
        [isMessageModalOpen, setMessageModalOpen] = useState(false),
        [isConfirmModalOpen, setConfirmModalOpen] = useState(false),
        [isRejectModalOpen, setRejectModalOpen] = useState(false),
        [isCloseDealModalOpen, setCloseDealModalOpen] = useState(false),
        [recipient, setRecipient] = useState(null),
        [offerId, setOfferId] = useState(null),
        [messageTheme, setMessageTheme] = useState(null)

    useEffect(() => {
        axios.get('/api/response/user/all', {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then(response => {
                setOffers(response.data.responses)
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
    }, [props.updateVal])

    return (
        <div className="col-12">
            <div className="row requests-wrapper">
                <OffersList key={props.updateVal}
                    offers={offers}
                    openMessageModal={(recipientId, theme) => {
                            setRecipient(recipientId)
                            setMessageTheme(theme)
                            setMessageModalOpen(true)
                        }
                    }
                    openConfirmModal={offerId => {
                            setOfferId(offerId)
                            setConfirmModalOpen(true)
                        }
                    }
                    openRejectModal={offerId => {
                            setOfferId(offerId)
                            setRejectModalOpen(true)
                        }
                    }
                    openCloseDealModal={offerId => {
                        setOfferId(offerId)
                        setCloseDealModalOpen(true)
                    }}
                />

                <SendMessageModal
                    isOpen={isMessageModalOpen}
                    closeModalFunc={() => setMessageModalOpen(false)}
                    modalTitle="Написать"
                    recipientId={recipient}
                    theme={messageTheme}
                />

                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    closeModalFunc={() => setConfirmModalOpen(false)}
                    modalTitle="Принять предложение"
                    confirmFunc={() => {
                        changeOfferStatus(props.token, 'accept', offerId)
                        props.updateComponent()
                    }}
                >
                    <p>
                        <b>Внимание!</b> Поставщик получит Ваши данные и свяжется с Вами в ближайшее время для заключения сделки.
                        Компания EcoPlant Organization не несет ответственность за действия поставщиков или иных третьих лиц.
                        В случае срыва сделки просим написать нам.
                    </p>
                </ConfirmModal>

                <ConfirmModal
                    isOpen={isRejectModalOpen}
                    closeModalFunc={() => setRejectModalOpen(false)}
                    modalTitle="Отклонить предложение"
                    confirmFunc={() => {
                        changeOfferStatus(props.token, 'reject', offerId)
                        props.updateComponent()
                    }}
                >
                    <p>
                        Вы уверены что хотите отклонить предложение?
                    </p>
                </ConfirmModal>

                <ConfirmModal
                    isOpen={isCloseDealModalOpen}
                    closeModalFunc={() => setCloseDealModalOpen(false)}
                    modalTitle="Закрыть сделку"
                    confirmFunc={() => {
                        changeOfferStatus(props.token, 'close', offerId)
                        props.updateComponent()
                    }}
                >
                    <p>
                        Вы уверены что хотите закрыть сделку?
                    </p>
                </ConfirmModal>
            </div>
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
        updateComponent: bindActionCreators(updateAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Offers)
