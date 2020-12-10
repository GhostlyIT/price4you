import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {paymentMethods} from './components/paymentMethods'
import {productUnits} from "../../../../helpers/units";
//TODO: Дописать поля для продуктов

const AddRequest = () => {
    const [products, setProducts] = useState([]),
        [productsOpen, setProductsOpen] = useState(false),
        [selectedProducts, setSelectedProducts] = useState([]),
        [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false),
        [requestTitle, setRequestTitle] = useState(''),
        [deliveryAddress, setDeliveryAddress] = useState('')

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
            axios.get(`/api/product/search/all?query=${query}`)
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

    const pickProduct = (product, productType) => {
        product['type'] = productType
        selectedProducts.push(product)
        console.log(selectedProducts)
    }

    const renderSelectedProducts = () => {
        if (selectedProducts.length > 0) {
            return selectedProducts.map(product => {
                return (
                    <div key={'picked-' + product.id} className="picked-product position-relative">
                        <span>{product.name}</span>
                        <button onClick={() => removeProductFromSelected(product)} type="button"
                                className="position-absolute remove-btn"></button>
                    </div>
                )
            })
        }
        return null
    }

    const removeProductFromSelected = (product) => {
        let arrCopy = [...selectedProducts]
        const index = arrCopy.indexOf(product)
        arrCopy.splice(index, 1)
        setSelectedProducts(arrCopy)
    }

    const renderProducts = () => {
        if (products.length < 1) {
            return (
                <span>Препараты не найдены</span>
            )
        }
        return Object.keys(products).map(key => {
          return products[key].map(product => {
              return (
                  <div onClick={() => pickProduct(product, key)} id={key + '-' + product.id} className="product" key={key + '-' + product.id}>
                      <span>{product.name}</span>
                      <small>{key}</small>
                  </div>
              )
          })
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


    const renderProductUnits = () => {
        return productUnits.map(unit => {
            return(
                <option>{unit}</option>
            )
        })
    }

    const renderFieldsForSelectedProducts = () => {
        if (selectedProducts.length > 0) {
            return selectedProducts.map(product => {
                return (
                    <div key={'field-picked-' + product.id} className="d-flex align-items-center picked-products__field row">
                        <label htmlFor={'field-picked-' + product.id} className="position-relative d-flex flex-column col-5">
                            {product.name}
                            <small>{product.type}</small>
                        </label>

                        <input id={'field-picked-' + product.id} className="col-5" />

                        <select className="col-2">
                            {renderProductUnits()}
                        </select>
                    </div>
                )
            })
        }
        return null
    }


    return (
        <section id="add-request" className="col-12">
            <h2 className="title">Новый запрос</h2>
            <span className="date">№ 124 от 7 сентября 2020</span>

            <hr/>

            <div className="d-flex align-items-center add-request__title add-request__component">
                <label htmlFor="request-title">Введите название запроса</label>
                <input onChange={e => setRequestTitle(e.target.value)} id="request-title"/>
            </div>

            <div className="request-products d-flex flex-column add-request__component">
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        <input onClick={() => setProductsOpen(true)} onChange={(e) => searchProduct(e.target.value)}
                               id="request-product" placeholder="Введите товар для запроса"/>
                        {productsOpen === true &&
                        <div id="request-products" className="falling-list position-absolute">{renderProducts()}</div>}
                    </div>
                </div>
                <div className="d-flex flex-wrap picked-products">{renderSelectedProducts()}</div>
            </div>

            <div className="d-flex align-items-center request__payment-methods add-request__component">
                <h5 className="add-request__component--title">Выберите способ оплаты:</h5>
                <div className="d-flex">{parsePaymentMethods()}</div>
            </div>

            <div className="d-flex align-items-center add-request__component">
                <h5 className="add-request__component--title">Введите Ваш адрес, куда необходимо доставить товар:</h5>
                <input className="address-field" onChange={e => setDeliveryAddress(e.target.value)}/>
            </div>

            <div className="d-flex add-request__component">
                <h5 className="add-request__component--title">Введите необходимый объем:</h5>
                <div className="d-flex flex-column">{renderFieldsForSelectedProducts()}</div>
            </div>
        </section>
    )
}

export default AddRequest
