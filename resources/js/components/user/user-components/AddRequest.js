import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { showNotification } from '../../functions/notifications'

const AddRequest = () => {
    const   [products, setProducts] = useState([]),
            [productsOpen, setProductsOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
    })

    const handleClick = (e) => {
        const requestProduct = document.getElementById('request-product')
        if (!e.path.includes(requestProduct)) {
            setProductsOpen(false)
        }
    }

    const searchProduct = (query) => {
        if (query != '') {
            axios.get(`/api/product/search?query=${query}`)
            .then((response) => {
                setProducts(response.data.search_result)
            })
            .catch((errors) => {
                setProducts([])
            })
        } else {
            setProducts([])
        }
    }

    const renderProducts = () => {
        if (products.length < 1) {
            return(
                <span>Препараты не найдены</span>
            )
        }
        return products.map(product => {
            return(
                <div className="product" key={product.id_product}>
                    <span>{product.name_product_rus}</span>
                </div>
            )
        })
    }

    return(
        <section id="add-request">
            <h3>Новый запрос</h3>
            <span className="date">№ 124 от 7 сентября 2020</span>

            <hr />

            <div className="d-flex align-items-center">
                <label htmlFor="request-title">Введите название запроса</label>
                <input id="request-title" />
            </div>

            <div className="request-products d-flex flex-column">
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        <input onClick={() => setProductsOpen(true)} onChange={(e) => searchProduct(e.target.value)} id="request-product" placeholder="Введите товар для запроса" />
                        {productsOpen === true && <div id="request-products" className="falling-list position-absolute">{renderProducts()}</div>}
                    </div>
                </div>

                <div className="d-flex picked-products"></div>
            </div>
        </section>
    )
}

export default AddRequest
