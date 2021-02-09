import React, {useState, useEffect} from 'react'
import Loader from "../../../../common/loader"
import axios from "axios"

const SearchRegion = ({regions, addRegion}) => {
    const [searchResult, setSearchResult] = useState([]),
        [loading, setLoading] = useState(false),
        [fallingListOpen, setFallingListOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
    })

    const handleClick = (e) => {
        const companies = document.getElementById('regions')
        const companyList = document.getElementById('company-wrapper')
        let path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(companies) && !path.includes(companyList)) {
            setFallingListOpen(false)
        }
    }

    const searchCompany = query => {
        if (query != '') {
            setLoading(true)
            axios.get(`/api/region/search?query=${query}`)
                .then(response => {
                    setSearchResult(response.data.regions)
                })
                .catch(error => {
                    setSearchResult([])
                })
                .then(() => {
                    setLoading(false)
                })
        } else {
            setSearchResult([])
        }
    }

    const renderRegions = () => {
        if (loading) {
            return (<Loader />)
        }

        if (searchResult.length > 0) {
            return searchResult.map(region => {
                return (
                    <div className="company-wrapper falling-list__element" key={region.id_count_reg}>
                        <h4 className="text-center font-weight-bold mb-2">{region.name_regions}</h4>

                        {
                            regions.findIndex(item => item.id_count_reg == region.id_count_reg) == -1
                                ? <button onClick={() => addRegion(region.id_count_reg)} type="button" className="white-blue-btn w-100">Добавить</button>
                                : <button type="button" className="white-blue-btn w-100" disabled>Добавлен</button>
                        }

                    </div>
                )
            })
        } else {
            return (<span>Регионы не найдены</span>)
        }
    }

    return(
        <div className="position-relative">
            <input
                onClick={() => setFallingListOpen(true)}
                onChange={(e) => searchCompany(e.target.value)}
                id="regions"
                placeholder="Поиск региона"
            />
            {fallingListOpen === true &&
            <div className="falling-list position-absolute">
                {renderRegions()}
            </div>
            }
        </div>
    )
}

export default SearchRegion
