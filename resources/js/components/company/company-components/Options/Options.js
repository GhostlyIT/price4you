import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import axios from "axios"
import {showNotification} from "../../../../helpers/notifications"
import ViewOptions from "./options-components/ViewOptions"
import SearchManufacture from "./options-components/SearchManufacture"
import ChoosenManufactures from "./options-components/ChoosenManufactures"
import SearchRegion from "./options-components/SearchRegion";
import ChoosenRegions from "./options-components/ChoosenRegions";


const Options = (props) => {
    const [selectedViewOption, setSelectedViewOption] = useState(1),
        [viewOptions, setViewOptions] = useState(null),
        [companyManufactures, setCompanyManufactures] = useState([]),
        [regions, setRegions] = useState([])

    const refreshOptions = () => {
        axios.get('/api/company/options', {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then(response => {
                setViewOptions(response.data.all_view_options)
                setSelectedViewOption(response.data.selected_view_option)
                setCompanyManufactures(response.data.manufactures)
                setRegions(response.data.regions)
            })
            .catch(error => {
                console.log(error.response.data.message)
                showNotification('Ошибка', 'Произошла ошибка. Попробуйте перезагрузить страницу.', 'danger')
            })
    }

    useEffect(() => {
        refreshOptions()
    }, [])

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

    const addManufacture = manufactureId => {
        axios.post('/api/company/manufacture/add',
            {
                manufacture_id: manufactureId
            },
            {
                headers: {'Authorization': 'Bearer ' + props.token}
            }
        )
        .then(response => {
            showNotification('Список производителей', 'Производитель добавлен список.', 'success')
            refreshOptions()
        })
        .catch(error => {
            showNotification('Ошибка', 'Произошла ошибка при добавлении производителя в список. Попробуйте еще раз.', 'danger')
            console.log(error.response.data.message)
        })
    }

    const removeManufacture = manufactureid => {
        axios.post('/api/company/manufacture/remove',
            {
                manufacture_id: manufactureid
            },
            {
                headers: {'Authorization': 'Bearer ' + props.token}
            }
        )
        .then(response => {
            showNotification('Список производителей', 'Производитель был удален из списка.', 'success')
            refreshOptions()
        })
        .catch(error => {
            showNotification('Ошибка', 'Произошла ошибка при удалении призводителя из списка. Попробуйте еще раз.', 'danger')
            console.log(error.response.data.message)
        })
    }

    const addRegion = regionId => {
        axios.post('/api/company/region/add',
            {
                region_id: regionId
            },
            {
                headers: {'Authorization': 'Bearer ' + props.token}
            }
        )
        .then(response => {
            showNotification('Список регионов', 'Регион добавлен в список.', 'success')
            refreshOptions()
        })
        .catch(error => {
            showNotification('Ошибка', 'Произошла ошибка при удалении региона из списка. Попробуйте еще раз.', 'danger')
            console.log(error.response.data.message)
        })
    }

    const removeRegion = regionId => {
        axios.post('/api/company/region/remove',
            {
                region_id: regionId
            },
            {
                headers: {'Authorization': 'Bearer ' + props.token}
            }
        )
        .then(response => {
            showNotification('Список регионов', 'Регион был удален из списка.', 'success')
            refreshOptions()
        })
        .catch(error => {
            showNotification('Ошибка', 'Произошла ошибка при удалении региона из списка. Попробуйте еще раз.', 'danger')
            console.log(error.response.data.message)
        })
    }

    //TODO: написать метод для добавления регионов компаниям

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
                <h3 className="options-element__title">Настройка получения запросов</h3>
                <p className="options-element__text">
                    Выберите производителей, продукцией которых вы торгуете
                </p>
                <SearchManufacture companyManufactures={companyManufactures} addManufacture={addManufacture} />
            </div>

            {
                companyManufactures.length > 0 &&
                <div className="options-element">
                    <h3 className="options-element__title">Выбранные компании</h3>
                    <ChoosenManufactures manufactures={companyManufactures} removeManufacture={removeManufacture} />
                </div>
            }

            <div className="options-element">
                <h3 className="options-element__title">Выберите регионы, в которых вы торгуете</h3>
                <SearchRegion regions={regions} addRegion={addRegion} />
            </div>

            {
                regions.length > 0 &&
                <div className="options-element">
                    <h3 className="options-element__title">Выбранные регионы</h3>
                    <ChoosenRegions regions={regions} removeRegion={removeRegion} />
                </div>
            }

        </div>
    )
}


const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
    };
}


export default connect(mapStateToProps)(Options)
