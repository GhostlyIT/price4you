import React, {useState, useEffect} from 'react'

const Paginator = ({totalItemsAmount, itemsOnPageAmount, getItemsFunc}) => {
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        getItemsFunc((activePage - 1) * itemsOnPageAmount)
    }, [activePage])

    const getPagesAmount = () => {
        return parseInt(totalItemsAmount) / parseInt(itemsOnPageAmount)
    }

    return (
        <div className="col-12 paginator d-flex justify-content-center align-items-center">
            {activePage !== 1 ? <span onClick={() => setActivePage(activePage - 1)} className="paginator__prev">Назад</span> : ''}
            <span className="paginator__current-page">{activePage}</span>
            {activePage < getPagesAmount() ? <span onClick={() => setActivePage(activePage + 1)} className="paginator__next">Вперед</span> : ''}
        </div>
    )
}

export default Paginator
