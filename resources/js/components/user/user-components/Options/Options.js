import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import axios from "axios"
import {showNotification} from "../../../../helpers/notifications"
import ViewOptions from "./options-components/ViewOptions"
import SearchCompany from "./options-components/SearchCompany"
import BlackList from "./options-components/BlackList";


const Options = (props) => {
    const [selectedViewOption, setSelectedViewOption] = useState(1),
        [viewOptions, setViewOptions] = useState(null),
        [blackList, setBlackList] = useState([])

    const refreshOptions = () => {
        axios.get('/api/user/options', {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then(response => {
                setViewOptions(response.data.all_view_options)
                setSelectedViewOption(response.data.selected_view_option)
                setBlackList(response.data.black_list)
            })
            .catch(error => {
                console.log(error.response.data.message)
                showNotification('Ошибка', 'Произошла ошибка. Попробуйте перезагрузить страницу.', 'danger')
            })
    }

    useEffect(() => {
        refreshOptions()
    }, [])

    const addCompanyToBlackList = companyId => {
        axios.post('/api/user/blacklist/add',
            {
                company_id: companyId
            },
            {
                headers: {'Authorization': 'Bearer ' + props.token}
            }
        )
            .then(response => {
                showNotification('Черный список', 'Компания добавлена в черный список.', 'success')
                refreshOptions()
            })
            .catch(error => {
                showNotification('Ошибка', 'Произошла ошибка при добавлении компании в черный список. Попробуйте еще раз.', 'danger')
                console.log(error.response.data.message)
            })
    }

    const removeCompanyFromBlackList = companyId => {
        axios.post('/api/user/blacklist/remove',
            {
                company_id: companyId
            },
            {
                headers: {'Authorization': 'Bearer ' + props.token}
            }
        )
            .then(response => {
                showNotification('Черный список', 'Компания была удалена из черного списка.', 'success')
                refreshOptions()
            })
            .catch(error => {
                showNotification('Ошибка', 'Произошла ошибка при удалени компании из черного списка. Попробуйте еще раз.', 'danger')
                console.log(error.response.data.message)
            })
    }

    const saveViewOption = optionId => {
        axios.post('/api/user/options/view/save',
            {
                option_id: optionId
            },
            {
                headers: {'Authorization': 'Bearer ' + props.token}
            }
        )
            .then(() => {
                refreshOptions()
            })
            .catch(error => {
                showNotification('Ошибка', 'Произошла ошибка. Попробуйте еще раз.', 'danger')
                console.log(error.response.data.message)
            })
    }

    return (
        <div className="col-12 options-wrapper">
            <h1 className="text-center">Настройки</h1>

            <div className="options-element">
                <h3 className="options-element__title">Показывать свои данные</h3>
                {viewOptions != null &&
                    <ViewOptions
                        options={viewOptions}
                        selectedOptionId={selectedViewOption}
                        setOption={saveViewOption}
                    />
                }
            </div>

            <div className="options-element">
                <h3 className="options-element__title">Настройки взаимодействия с компаниями</h3>
                <p className="options-element__text">
                    Выберите компании, с которыми вы не хотите сотрудничать
                </p>
                <SearchCompany blackList={blackList} addCompanyToBlackList={addCompanyToBlackList} />
            </div>

            <div className="options-element">
                <h3 className="options-element__title">Компании в черном списке</h3>
                <BlackList blackList={blackList} removeCompanyFromBlackList={removeCompanyFromBlackList} />
            </div>
        </div>
    )
}


const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
    };
}


export default connect(mapStateToProps)(Options)
