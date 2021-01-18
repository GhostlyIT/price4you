import React, {useState, useEffect} from 'react'
import Loader from "../../../../common/loader"
import axios from "axios"

const SearchManufacture = ({companyManufactures, addManufacture}) => {
    const [searchResult, setSearchResult] = useState([]),
        [loading, setLoading] = useState(false),
        [fallingListOpen, setFallingListOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
    })

    const handleClick = (e) => {
        const companies = document.getElementById('companies')
        const companyList = document.getElementById('company-wrapper')
        let path = e.path || (Event.composedPath && Event.composedPath())
        if (!path.includes(companies) && !path.includes(companyList)) {
            setFallingListOpen(false)
        }
    }

    const searchCompany = query => {
        if (query != '') {
            setLoading(true)
            axios.get(`/api/manufacture/search?query=${query}`)
                .then(response => {
                    setSearchResult(response.data.manufactures)
                })
                .catch(error => {
                    setSearchResult([])
                    console.log(error.response.data.message)
                })
                .then(() => {
                    setLoading(false)
                })
        } else {
            setSearchResult([])
        }
    }

    const renderCompanies = () => {
        if (loading) {
            return (<Loader />)
        }

        if (searchResult.length > 0) {
            return searchResult.map(manufacture => {
                return (
                    <div className="company-wrapper falling-list__element" key={manufacture.id_manufacture}>
                        <h4 className="text-center font-weight-bold mb-2">{manufacture.name_manufacture_rus}</h4>

                        {
                            companyManufactures.findIndex(item => item.id_manufacture == manufacture.id_manufacture) == -1
                                ? <button onClick={() => addManufacture(manufacture.id_manufacture)} type="button" className="white-blue-btn w-100">Добавить</button>
                                : <button type="button" className="white-blue-btn w-100" disabled>Добавлен</button>
                        }

                    </div>
                )
            })
        } else {
            return (<span>Производители не найдены</span>)
        }
    }

    return(
        <div className="position-relative">
            <input
                onClick={() => setFallingListOpen(true)}
                onChange={(e) => searchCompany(e.target.value)}
                id="companies"
                placeholder="Поиск производителя"
            />
            {fallingListOpen === true &&
            <div className="falling-list position-absolute">
                {renderCompanies()}
            </div>
            }
        </div>
    )
}

export default SearchManufacture
