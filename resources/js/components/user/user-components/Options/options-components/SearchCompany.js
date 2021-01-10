import React, {useState, useEffect} from 'react'
import Loader from "../../../../common/loader";
import axios from "axios"

const SearchCompany = ({blackList, addCompanyToBlackList}) => {
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

    const searchCompany = (query) => {
        if (query != '') {
            setLoading(true)
            axios.get(`/api/company/search?query=${query}`)
                .then(response => {
                    setSearchResult(response.data.companies)
                    setLoading(false)
                })
                .catch(error => {
                    setSearchResult([])
                    setLoading(false)
                    console.log(error.response.data.message)
                })
                .then(() => {
                    setLoading(false)
                })
        }
    }

    const renderCompanies = () => {
        if (loading) {
            return (<Loader />)
        }

        if (searchResult.length > 0) {
            return searchResult.map(company => {
                return (
                    <div className="company-wrapper falling-list__element" key={company.id}>
                        <h4 className="text-center font-weight-bold mb-2">{company.company_name}</h4>

                        <div>
                            <span className="options__address">
                                <i className="geo-icon"></i>
                                <span>{company.company_address}</span>
                            </span>
                        </div>

                        <div>
                            <span className="options__phone">
                                <i className="phone-icon"></i>
                                <span>{company.user.phone_number}</span>
                            </span>
                        </div>

                        {
                            blackList.findIndex(item => item.company_id == company.id) == -1
                                ? <button onClick={() => addCompanyToBlackList(company.id)} type="button" className="white-blue-btn w-100">Добавить</button>
                                : <button type="button" className="white-blue-btn w-100" disabled>Добавлена</button>
                        }

                    </div>
                )
            })
        } else {
            return (<span>Компании не найдены</span>)
        }
    }

    return (
        <div className="position-relative">
            <input
                onClick={() => setFallingListOpen(true)}
                onChange={(e) => searchCompany(e.target.value)}
                id="companies"
                placeholder="Поиск компании"
            />
            {fallingListOpen === true &&
                <div className="falling-list position-absolute">
                    {renderCompanies()}
                </div>
            }
        </div>
    )
}

export default SearchCompany
