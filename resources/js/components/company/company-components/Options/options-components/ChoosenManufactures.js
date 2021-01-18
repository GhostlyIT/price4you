import React from 'react'

const ChoosenManufactures = ({manufactures, removeManufacture}) => {
    if (manufactures.length > 0) {
        return manufactures.map(manufacture => {
            return (
                <div key={manufacture.id_manufacture} className="black-list">
                    <div className="d-flex align-items-center">
                        <span className="mr-4">{manufacture.name_manufacture_rus}</span>
                        <button onClick={() => removeManufacture(manufacture.id_manufacture)} type="button" className="btn btn-danger">Удалить</button>
                    </div>
                </div>
            )
        })
    }
    return(<></>)
}

export default ChoosenManufactures
