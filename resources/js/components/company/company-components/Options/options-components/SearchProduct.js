import React, {useState, useEffect} from 'react'
import Loader from "../../../../common/loader"
import axios from "axios"

const SearchProduct = ({products, addProduct}) => {
    const [searchResult, setSearchResult] = useState([]),
        [loading, setLoading] = useState(false),
        [fallingListOpen, setFallingListOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
    })

    const handleClick = (e) => {
        const products = document.getElementById('products')
        const companyList = document.getElementById('company-wrapper')
        let path = e.path || (Event.composedPath && Event.composedPath())
        if (!path.includes(products) && !path.includes(companyList)) {
            setFallingListOpen(false)
        }
    }

    const searchProducts = query => {
        if (query != '') {
            setLoading(true)
            axios.get(`/api/product/search/all?query=${query}`)
                .then(response => {
                    setSearchResult(response.data.search_result)
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

    const renderProducts = () => {
        if (loading) {
            return (
                <Loader/>
            )
        }
        if (searchResult.length < 1) {
            return (
                <span>Препараты не найдены</span>
            )
        }
        return Object.keys(searchResult).map(key => {
            return searchResult[key].map(product => {
                return (
                    <div className="company-wrapper falling-list__element" key={product.id}>
                        <h4 className="text-center font-weight-bold mb-2">{product.name}</h4>

                        {
                            products.findIndex(item => item.id == product.id) == -1
                                ? <button onClick={() => addProduct(product.id, key)} type="button" className="white-blue-btn w-100">Добавить</button>
                                : <button type="button" className="white-blue-btn w-100" disabled>Добавлен</button>
                        }

                    </div>
                )
            })
        })
    }

    return(
        <div className="position-relative">
            <input
                onClick={() => setFallingListOpen(true)}
                onChange={(e) => searchProducts(e.target.value)}
                id="products"
                placeholder="Поиск товаров"
            />
            {fallingListOpen === true &&
            <div className="falling-list position-absolute">
                {renderProducts()}
            </div>
            }
        </div>
    )
}

export default SearchProduct
