import React from 'react'

const ChoosenRegions = ({regions, removeRegion}) => {
    if (regions.length > 0) {
        return regions.map(region => {
            return (
                <div key={region.id_count_reg} className="black-list">
                    <div className="d-flex align-items-center">
                        <span className="mr-4">{region.name_regions}</span>
                        <button onClick={() => removeRegion(region.id_count_reg)} type="button" className="btn btn-danger">Удалить</button>
                    </div>
                </div>
            )
        })
    }
    return(<></>)
}

export default ChoosenRegions
