import React from 'react'

const ChoosenProducts = ({products, removeProduct}) => {
    if (products.length > 0) {
        return products.map(product => {
            return (
                <div key={product.id} className="black-list">
                    <div className="d-flex align-items-center">
                        <span className="mr-4">{product.name}</span>
                        <button onClick={() => removeProduct(product.id)} type="button" className="btn btn-danger">Удалить</button>
                    </div>
                </div>
            )
        })
    }
    return(<></>)
}

export default ChoosenProducts
