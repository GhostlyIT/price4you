import React, {useState, useEffect, useRef} from 'react'
import Loader from "../../../../common/loader"
import axios from "axios"

const SearchRegion = ({selectRegion, selectedRegion}) => {
    const [searchResult, setSearchResult] = useState([]),
        [loading, setLoading] = useState(false),
        [fallingListOpen, setFallingListOpen] = useState(false)

    const input = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
    })

    useEffect(() => {
        if (selectedRegion != null) {
            input.current.value = selectedRegion.name_regions
        }
    }, [selectedRegion])

    useEffect(() => {
        if (selectedRegion === null) {
            console.log('err')
            if (searchResult.length > 0) {
                selectRegion(searchResult[0])
            } else {
                input.current.value = ''
            }
        } else {
            input.current.value = selectedRegion.name_regions
        }
    }, [fallingListOpen])

    const handleClick = (e) => {
        const companies = document.getElementById('regions')
        const companyList = document.getElementById('company-wrapper')
        let path = e.path || (Event.composedPath && Event.composedPath())

        if (!path.includes(companies) && !path.includes(companyList)) {
            setFallingListOpen(false)
        }
    }

    const searchRegion = query => {
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
            //setSearchResult([])
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
                        <button onClick={() => selectRegion(region)} type="button" className="white-blue-btn w-100">Выбрать</button>
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
                onChange={e => searchRegion(e.target.value)}
                id="regions"
                placeholder="Укажите Ваш регион"
                ref={input}
            />

            {fallingListOpen === true &&
                <div className="falling-list position-absolute">
                    { renderRegions() }
                </div>
            }
        </div>
    )
}

export default SearchRegion
