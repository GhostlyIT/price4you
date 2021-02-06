import React from 'react'
import UsersRequests from "./components/UsersRequests";

const Requests = () => {
    return (
     <div className="col-12">
         <div className="d-flex justify-content-center col-12">
             <h3>Запросы</h3>
         </div>
         <UsersRequests />
     </div>
    )
}

export default Requests
