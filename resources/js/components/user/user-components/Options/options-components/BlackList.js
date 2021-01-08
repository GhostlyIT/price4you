import React from 'react'

const BlackList = ({blackList, removeCompanyFromBlackList}) => {
    if (blackList.length > 0) {
        return blackList.map(record => {
            return (
                <div key={record.id} className="black-list">
                    <div className="d-flex justify-content-between">
                        <span>{record.company.company_name}</span>
                        <button type="button" className="remove-btn">Удалить</button>
                    </div>
                </div>
            )
        })
    }
    return(<></>)
}

export default BlackList
