import React, {useState} from 'react'
import Modal from 'react-modal'

const MyModal = (props) => {
    const isOpen = props.isOpen
    const closeModal = props.closeModal
    const modalTitle = props.modalTitle

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >

            <div className="d-flex justify-content-between row modal__header">
                <div className="col-11">
                    <h3>{modalTitle}</h3>
                </div>

                <div className="col-1">
                    <button onClick={closeModal}>X</button>
                </div>
            </div>

            {props.children}
        </Modal>
    )
}

export default MyModal
