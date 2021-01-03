import React, {useState, useEffect} from 'react'

const Paginator = ({totalItemsAmount, itemsOnPageAmount, getItemsFunc}) => {
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        getItemsFunc((activePage - 1) * itemsOnPageAmount)
    }, [])

    const getPagesAmount = () => {
        return parseInt(totalItemsAmount) / parseInt(itemsOnPageAmount)
    }

    return (
        <>
            {activePage !== 1 ? <span>Назад</span> : ''}
            <span>{activePage}</span>
            {activePage < getPagesAmount() ? <span>Вперед</span> : ''}
        </>
    )
}

export default Paginator
