import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {paymentMethods} from './components/paymentMethods'
import {productUnits} from "../../../../helpers/units"
import MyModal from "../../../common/modal"
import {showNotification} from "../../../../helpers/notifications"
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import authAction from "../../../../store/actions/authAction"
import Loader from "../../../common/loader";

const AddRequest = (props) => {
    const [products, setProducts] = useState([]),
        [productsOpen, setProductsOpen] = useState(false),
        [selectedProducts, setSelectedProducts] = useState([]),
        [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false),
        [requestTitle, setRequestTitle] = useState(''),
        [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(false),
        [deliveryAddress, setDeliveryAddress] = useState(''),
        [productToCalculate, setProductToCalculate ] = useState(false),
        [isModalOpen, setIsModalOpen] = useState(false),
        [rates, setRates] = useState([]),
        [dataToCalculate,] = useState({
            id_culture: 0,
            area: 0,
            rate: 0
        }),
        [comment, setComment] = useState(false),
        [loading, setLoading] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
    })

    const handleClick = (e) => {
        const requestProduct = document.getElementById('request-product')
        let path = e.path || (event.composedPath && event.composedPath())
        if (!path.includes(requestProduct)) {
            setProductsOpen(false)
        }
    }

    const searchProduct = (query) => {
        if (query != '') {
            setLoading(true)
            axios.get(`/api/product/search/all?query=${query}`)
                .then((response) => {
                    setProducts(response.data.search_result)
                })
                .catch(() => {
                    setProducts([])
                })
                .then(() => {
                    setLoading(false)
                })
        } else {
            setProducts([])
        }
    }

    const pickProduct = (product, productType) => {
        product['type'] = productType
        switch (productType) {
            case 'Защита растений':
                product['type_for_db'] = 'product'
                break
            case 'Семена':
                product['type_for_db'] = 'seed'
                break
            case 'Удобрения':
                product['type_for_db'] = 'fertiliser'
                break
        }
        product['unit'] = 'кг'
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
        if (loading) {
            return (
                <Loader/>
            )
        }
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
                <option value={unit} key={unit}>{unit}</option>
            )
        })
    }

    const renderFieldsForSelectedProducts = () => {
        if (selectedProducts.length > 0) {
            return selectedProducts.map((product, i) => {
                return (
                    <div key={'field-picked-' + product.name + '-' + product.id} className="d-flex align-items-center picked-products__field row">

                        <label htmlFor={'field-picked-' + product.id} className="position-relative d-flex flex-column col-lg-4 col-xs-12">
                            {product.name}
                            <small>{product.type}</small>
                            <small>Упаковка: {product.tara.tara_name}</small>
                        </label>

                        <div className="d-flex align-items-center no-mobile-column col-lg-4 col-xs-12">
                            <input onChange={(e) => selectedProducts[i].value = parseFloat(e.target.value) }
                                    id={'field-picked-' + product.id}
                                    className="col-lg-2 col-xs-10"
                            />

                            { product.type != 'Защита растений' && product.type != 'Удобрения'
                                ? <select onChange={(e) => selectedProducts[i].unit = e.target.value } className="ml-3 mr-3 col-xs-2">
                                    {renderProductUnits()}
                                </select>
                                : <span className="ml-3 mr-3 col-xs-2">{selectedProducts[i].unit = product.tara.tara_unit}</span>
                            }
                        </div>

                        { product.type === 'Защита растений' &&
                            <div className="col-lg-4 col-xs-12 text-center">
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

        const index = selectedProducts.findIndex((el) => {
            if (el.id == product.id)
                return true
        })

        if (product) {
            const selectCulture = (cultureDomElement, culture, regdata) => {
                $('.calculate-product__culture').removeClass('selected')
                cultureDomElement.addClass('selected')
                dataToCalculate.id_culture = culture

                if ('id_regdata_lph' in regdata) {
                    setRates([regdata.rate])
                } else {
                    setRates([regdata.min_rate, regdata.max_rate])
                }

                // axios.get(`/api/product/rates-by-culture?id_product=${product.id}&id_culture=${culture}`)
                // .then((response) => {
                //     setRates(response.data.rates)
                // })
                // .catch((error) => {
                //     console.log(error.message)
                //     setRates([])
                // })
            }


            const calculateVolume = () => {
                axios.post('/api/product/calculate-volume', dataToCalculate)
                .then(response => {
                    $('#field-picked-' + product.id).val(response.data.result)
                    selectedProducts[index].value = response.data.result
                    setRates([])
                    setIsModalOpen(false)
                })
                .catch(error => {
                    showNotification('Автоматический расчет объема препарата', error.response.data.message, 'danger')
                })
            }


            return (
                <div key={'calculate-' + product.name + '-' + product.id} className="d-flex flex-column calculate-product add-request__component">
                    <h5 className="add-request__component--title">{product.name}</h5>
                    <div className="d-flex align-items-center calculate-product__row">
                        <span className="calculate-product__title">Выберите вашу культуру:</span>
                        <div className="calculate-product__culture-list">
                            {
                                product.regdata.map(regdataElement => {
                                    const culture = regdataElement.culture
                                    return (
                                        <span onClick={(e) => selectCulture($(e.currentTarget), culture.id_culture, regdataElement) } key={culture.name_rus + culture.id_culture}
                                              className="select-cards calculate-product__culture d-flex align-items-center justify-content-center">{culture.name_rus}</span>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="d-flex align-items-center calculate-product__area calculate-product__row">
                        <span className="calculate-product__title">Введите площадь для обработки:</span>
                        <input onChange={(e) => dataToCalculate.area = e.target.value} type="number" min="0" />
                    </div>

                    <div className="d-flex align-items-center calculate-product__row">
                        <span className="calculate-product__title">Выберите норму применения:</span>
                        <div className="calculate-product__culture-list">
                            { rates.length > 0 &&
                                rates.map((rate, i) => {
                                    return (
                                        <span onClick={(e) => {
                                            dataToCalculate.rate = rate
                                            $('.calculate-product__rate').removeClass('selected')
                                            $(e.currentTarget).addClass('selected')
                                        }} key={rate + i} className="select-cards calculate-product__rate d-flex align-items-center justify-content-center">{rate}</span>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="d-flex align-items-center calculate-product__row">
                        <button onClick={() => calculateVolume()} type="button" className="btn btn-success btn-lg">Рассчитать</button>
                    </div>
                </div>
            )
        }
        return null
    }

    const sendRequest = () => {
        axios.post('/api/request/save', {
            title: requestTitle,
            payment_method: selectedPaymentMethod,
            delivery_method: selectedDeliveryMethod,
            comment: comment,
            delivery_address: deliveryAddress,
            products: selectedProducts
        },
        {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
        .then((response) => {
            showNotification('Создание нового запроса', response.data.message, 'success')
            setTimeout(() => {
                document.location.reload()
            }, 1000)
        })
        .catch((error) => {
            showNotification('Создание нового запроса', error.response.data.message, 'danger')
        })
    }


    return (
        <section id="add-request" className="col-12">
            <h2 className="title">Новый запрос</h2>

            <hr/>

            <div className="d-flex align-items-center add-request__title add-request__component">
                <label htmlFor="request-title">Введите название запроса</label>
                <input onChange={e => setRequestTitle(e.target.value)} id="request-title"/>
            </div>

            <div className="d-flex align-items-center add-request__title add-request__component">
                <label htmlFor="request-comment">Введите Ваш комментарий к запросу</label>
                <input onChange={e => setComment(e.target.value)} id="request-comment"/>
            </div>

            <div className="request-products d-flex flex-column add-request__component">
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        <input onClick={() => setProductsOpen(true)} onChange={(e) => searchProduct(e.target.value)}
                               id="request-product" placeholder="Введите товар для запроса"/>
                        {productsOpen === true &&
                            <div id="request-products" className="falling-list position-absolute">{renderProducts()}</div>
                        }
                    </div>
                </div>
                <div className="d-flex flex-wrap picked-products">{renderSelectedProducts()}</div>
            </div>

            <div className="d-flex align-items-center request__payment-methods add-request__component">
                <h5 className="add-request__component--title">Выберите способ оплаты:</h5>
                <div className="d-flex">{parsePaymentMethods()}</div>
            </div>

            <div className="d-flex align-items-center request__payment-methods add-request__component">
                <h5 className="add-request__component--title">Выберите способ доставки:</h5>
                <div className="d-flex">
                    <span
                        onClick={() => setSelectedDeliveryMethod('Самовывоз')}
                        className={`select-cards d-flex align-items-center ${selectedDeliveryMethod === 'Самовывоз' && 'selected'}`}
                    >
                        Самовывоз
                    </span>

                    <span
                        onClick={() => setSelectedDeliveryMethod('До двери')}
                        className={`select-cards d-flex align-items-center ${selectedDeliveryMethod === 'До двери' && 'selected'}`}
                    >
                        До двери
                    </span>
                </div>
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

            <hr/>

            <div className="d-flex align-items-center justify-content-center add-request__component">
                <button onClick={() => sendRequest()} type="button" className="main-btn">Отправить запрос</button>
            </div>

            <MyModal isOpen={isModalOpen}
                     closeModal={() => setIsModalOpen(false)}
                     modalTitle="Автоматический расчет необходимого объема препарата"
            >
                { renderProductsToCalculate() }
            </MyModal>
        </section>
    )
}

const mapStateToProps = store => {
    return {
        token: store.authReducer.userToken,
    };
}

const mapDispatchProps = dispatch => {
    return {
        auth: bindActionCreators(authAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchProps)(AddRequest)
