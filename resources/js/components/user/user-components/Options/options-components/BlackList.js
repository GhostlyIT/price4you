import React from 'react'

const BlackList = ({blackList, removeCompanyFromBlackList}) => {
    if (blackList.length > 0) {
        return blackList.map(record => {
            return (
                <div key={record.id} className="black-list">
                    <div className="d-flex align-items-center">
                        <span className="mr-4">{record.company.company_name}</span>
                        <button onClick={() => removeCompanyFromBlackList(record.company.id)} type="button" className="btn btn-danger">Удалить</button>
                    </div>
                </div>
            )
        })
    }
    return(<></>)
}

export default BlackList
