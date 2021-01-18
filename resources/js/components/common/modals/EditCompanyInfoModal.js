import React, {useState} from 'react'
import MyModal from "../modal"
import axios from "axios"

const EditCompanyInfoModal = ({isModalOpen, closeModal, company, editFunc}) => {
    const [companyName, setCompanyName] = useState(company.company_name),
        [director, setDirector] = useState(company.director),
        [address, setAddress] = useState(company.company_address),
        [email, setEmail] = useState(company.email),
        [about, setAbout] = useState(company.about)

    return(
        <MyModal isOpen={isModalOpen} closeModal={closeModal} modalTitle="Редактирование профиля компании">
            <div className="modal__body">
                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">Название компании</span>
                    <input onChange={e => setCompanyName(e.target.value)} type="text" value={companyName} />
                </div>

                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">Руководитель</span>
                    <input onChange={e => setDirector(e.target.value)} type="text" value={director} />
                </div>

                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">Адрес</span>
                    <input onChange={e => setAddress(e.target.value)} type="text" value={address} />
                </div>

                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">Email</span>
                    <input onChange={e => setEmail(e.target.value)} type="email" value={email} />
                </div>

                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">О компании</span>
                    <textarea onChange={e => setAbout(e.target.value)} type="text" value={about} rows="5"></textarea>
                </div>

                <div className="modal__element">
                    <button onClick={() => editFunc(companyName, director, address, email, about)} className="main-btn" type="button">Сохранить</button>
                </div>
            </div>
        </MyModal>
    )
}

export default EditCompanyInfoModal
