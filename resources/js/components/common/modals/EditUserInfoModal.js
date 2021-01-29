import React, {useState} from 'react'
import MyModal from "../modal"
import InputMask from "react-input-mask";

const EditUserInfoModal = ({isModalOpen, closeModal, user, editFunc}) => {
    const [name, setName] = useState(user.name),
        [surname, setSurname] = useState(user.surname),
        [phone, setPhone] = useState(user.phone_number),
        [email, setEmail] = useState(user.email)

    return(
        <MyModal isOpen={isModalOpen} closeModal={closeModal} modalTitle="Редактирование профиля">
            <div className="modal__body">
                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">Имя</span>
                    <input onChange={e => setName(e.target.value)} type="text" value={name} />
                </div>

                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">Фамилия</span>
                    <input onChange={e => setSurname(e.target.value)} type="text" value={surname} />
                </div>

                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">Телефон</span>
                    <InputMask mask="+7(999)999-99-99" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                </div>

                <div className="modal__element d-flex flex-column">
                    <span className="mb-2 font-weight-bold">Email</span>
                    <input onChange={e => setEmail(e.target.value)} type="email" value={email} />
                </div>

                <div className="modal__element">
                    <button onClick={() => editFunc(name, surname, phone, email)} className="main-btn" type="button">Сохранить</button>
                </div>
            </div>
        </MyModal>
    )
}

export default EditUserInfoModal
