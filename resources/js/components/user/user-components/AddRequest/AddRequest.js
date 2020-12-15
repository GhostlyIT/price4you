import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {paymentMethods} from './components/paymentMethods'
import {productUnits} from "../../../../helpers/units"
import MyModal from "../../../../helpers/modal"

const AddRequest = () => {
    const [products, setProducts] = useState([]),
        [productsOpen, setProductsOpen] = useState(false),
        [selectedProducts, setSelectedProducts] = useState([]),
        [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false),
        [requestTitle, setRequestTitle] = useState(''),
        [deliveryAddress, setDeliveryAddress] = useState(''),
        [productToCalculate, setProductToCalculate ] = useState(false),
        [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
    })

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

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
    }

    const renderSelectedProducts = () => {
        if (selectedProducts.length > 0) {
            return selectedProducts.map(product => {
                return (
                    <div key={'picked-' + product.id} className="picked-product position-relative">
                        <span>{product.name}</span>
                        <button onClick={() => removeProductFromList(product, selectedProducts, setSelectedProducts)} type="button"
                                className="position-absolute remove-btn"></button>
                    </div>
                )
            })
        }
        return null
    }

    const removeProductFromList = (product, list, setFunction) => {
        let arrCopy = [...list]
        const index = arrCopy.indexOf(product)
        arrCopy.splice(index, 1)
        setFunction(arrCopy)
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
                        key={method + i}
                        className={`select-cards d-flex align-items-center ${selectedPaymentMethod === method && 'selected'}`}
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
                <option key={unit}>{unit}</option>
            )
        })
    }

    const renderFieldsForSelectedProducts = () => {
        if (selectedProducts.length > 0) {
            return selectedProducts.map(product => {
                return (
                    <div key={'field-picked-' + product.name + '-' + product.id} className="d-flex align-items-center picked-products__field row">

                        <label htmlFor={'field-picked-' + product.id} className="position-relative d-flex flex-column col-4">
                            {product.name}
                            <small>{product.type}</small>
                        </label>

                        <input id={'field-picked-' + product.name + '-' + product.id} className="col-2" />

                        <select className="ml-3 mr-3">
                            {renderProductUnits()}
                        </select>

                        { product.type === 'Защита растений' &&
                            <div className="col-4">
                                    <button onClick={() => {
                                            setProductToCalculate(product)
                                            setIsModalOpen(true)
                                        }
                                    } className="btn btn-success" type="button">Рассчитать автоматически</button>
                            </div>
                        }
                    </div>
                )
            })
        }
        return null
    }

    const renderProductsToCalculate = () => {
        const product = productToCalculate
        if (product) {
            const data = {
                culture: 0,
                area: 0,
                rates: 0
            }

            const selectCulture = (cultureDomElement, culture) => {
                $('.calculate-product__culture').removeClass('selected')
                cultureDomElement.addClass('selected')
                data.culture = culture
            }

            return (
                <div key={'calculate-' + product.name + '-' + product.id}
                     className="d-flex flex-column calculate-product add-request__component">
                    <h5 className="add-request__component--title">{product.name}</h5>
                    <div className="d-flex align-items-center calculate-product__row">
                        <span className="calculate-product__title">Выберите вашу культуру:</span>
                        <div className="calculate-product__culture-list">
                            {
                                product.culture.map(culture => {
                                    return (
                                        <span onClick={(e) => selectCulture($(e.currentTarget), culture.id_culture) } key={culture.name_rus + culture.id_culture}
                                              className="select-cards calculate-product__culture d-flex align-items-center justify-content-center">{culture.name_rus}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="d-flex align-items-center calculate-product__area calculate-product__row">
                        <span className="calculate-product__title">Введите площадь для обработки:</span>
                        <input type="number" />
                    </div>
                </div>
            )
        }
        return null
    }




    return (
        <section id="add-request" className="col-12">
            <h2 className="title">Новый запрос</h2>

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

            { selectedProducts.length > 0 &&
                <div className="d-flex add-request__component">
                    <h5 className="add-request__component--title">Введите необходимый объем:</h5>
                    <div className="d-flex flex-column">{renderFieldsForSelectedProducts()}</div>
                </div>
            }

            <MyModal isOpen={isModalOpen}
                     closeModal={() => setIsModalOpen(false)}
                     modalTitle="Автоматический расчет необходимого объема препарата"
            >
                {renderProductsToCalculate()}
            </MyModal>
        </section>
    )
}

export default AddRequest
