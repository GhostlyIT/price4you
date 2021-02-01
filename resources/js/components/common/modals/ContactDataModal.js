import React from 'react'
import MyModal from "../modal"

const ContactDataModal = ({isOpen, closeModalFunc, modalTitle, contactData, writeMessageFunc}) => {
    console.log(contactData)
    return (
        <MyModal isOpen={isOpen} closeModal={closeModalFunc} modalTitle={modalTitle}>
            <div className="modal__body">
                <div className="modal__element">
                    <div className="d-flex align-items-center">
                        {contactData.avatar == null
                            ? <div className="avatar avatar--small mr-3"></div>
                            : <div className="avatar avatar--small mr-3" style={{backgroundImage: `url(${contactData.avatar})`}}></div>
                        }

                        <span className="user-name" style={{
                            margin: '0',
                            fontSize: '24px',
                            padding: '0'
                        }}>{contactData.name} {contactData.surname}</span>
                    </div>
                </div>

                <div className="modal__element">
                    <div className="d-flex flex-column list pl-3">
                        <span className="list__element d-flex align-items-center">
                            <i className="phone-icon"></i>
                            <span>{contactData.phone_number}</span>
                        </span>
                    </div>
                </div>

                <div className="modal__element">
                    <div className="d-flex justify-content-center">
                        <button onClick={() => writeMessageFunc()} className="main-btn mr-4">Написать</button>
                        <a href={`tel:${contactData.phone_number}`} className="secondary-btn text-center">Позвонить</a>
                    </div>
                </div>
            </div>
        </MyModal>
    )
}

export default ContactDataModal
