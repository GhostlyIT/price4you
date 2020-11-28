import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {paymentMethods} from './components/paymentMethods'

const AddRequest = () => {
    const   [products, setProducts] = useState([]),
            [productsOpen, setProductsOpen] = useState(false),
            [selectedProducts, setSelectedProducts] = useState([]), // Выбранные препараты
            [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false)

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
            .catch(() => {
                setProducts([])
            })
        } else {
            setProducts([])
        }
    }

    const pickProduct = (product) => {
        selectedProducts.push(product)
    }

    const renderSelectedProducts = () => {
        if (selectedProducts.length > 0) {
            return selectedProducts.map((product) => {
                return(
                    <div key={'picked-' + product.id_product} className="picked-product position-relative">
                        <span>{product.name_product_rus}</span>
                        <button onClick={() => removeProductFromSelected(product)} type="button" className="position-absolute remove-btn"></button>
                    </div>
                )
            })
        }
        return null
    }

    const removeProductFromSelected = (product) => {
        let arrCopy = [...selectedProducts]
        const index = arrCopy.indexOf(product)
        console.log(index)
        arrCopy.splice(index, 1)
        setSelectedProducts(arrCopy)
    }

    const renderProducts = () => {
        if (products.length < 1) {
            return(
                <span>Препараты не найдены</span>
            )
        }
        return products.map(product => {
            return(
                <div onClick={() => pickProduct(product)} className="product" key={product.id_product}>
                    <span>{product.name_product_rus}</span>
                </div>
            )
        })
    }

    const parsePaymentMethods = () => {
        if (paymentMethods.length > 0) {
            return paymentMethods.map((method, i) => {
                return (
                    <span
                        onClick={() => setSelectedPaymentMethod(method)}
                        key={i}
                        className={`payment-method d-flex align-items-center ${selectedPaymentMethod === method && 'selected'}`}
                    >
                        {method}
                    </span>
                )
            })
        }
    }



    return(
        <section id="add-request" className="col-12">
            <h2 className="title">Новый запрос</h2>
            <span className="date">№ 124 от 7 сентября 2020</span>

            <hr />

            <div className="d-flex align-items-center add-request__title add-request__component">
                <label htmlFor="request-title">Введите название запроса</label>
                <input id="request-title" />
            </div>

            <div className="request-products d-flex flex-column add-request__component">
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        <input onClick={() => setProductsOpen(true)} onChange={(e) => searchProduct(e.target.value)} id="request-product" placeholder="Введите товар для запроса" />
                        {productsOpen === true && <div id="request-products" className="falling-list position-absolute">{renderProducts()}</div>}
                    </div>
                </div>
                <div className="d-flex flex-wrap picked-products">{renderSelectedProducts()}</div>
            </div>

            <div className="d-flex align-items-center request__payment-methods add-request__component">
                <h5 className="add-request__component--title">Выберите способ оплаты:</h5>
                <div className="d-flex">{parsePaymentMethods()}</div>
            </div>
        </section>
    )
}

export default AddRequest
