import React, {useState, useEffect} from 'react'
import axios from "axios"
import {connect} from "react-redux"
import OffersList from "./offers-components/OffersList"
import SendMessageModal from "../../../common/modals/SendMessageModal";

const Offers = (props) => {
    const [offers, setOffers] = useState([]),
        [isMessageModalOpen, setMessageModalOpen] = useState(false),
        [recipient, setRecipient] = useState(null)

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
    }, [])

    return (
        <div className="col-12">
            <div className="row requests-wrapper">
                <OffersList
                    offers={offers}
                    openMessageModal={(recipientId) => {
                            setRecipient(recipientId)
                            setMessageModalOpen(true)
                        }
                    }
                />
                <SendMessageModal
                    isOpen={isMessageModalOpen}
                    closeModalFunc={() => setMessageModalOpen(false)}
                    modalTitle="Написать"
                    recipientId={recipient}
                />
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
    };
}

export default connect(mapStateToProps)(Offers)
