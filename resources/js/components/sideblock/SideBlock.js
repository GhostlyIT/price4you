import React from 'react'
import UnauthorizedMenu from "../menus/UnauthorizedMenu"

const SideBlock = () => {
    return (
        <div className="d-flex flex-column user-sideblock justify-content-between">
            <UnauthorizedMenu />
        </div>
    )
}

export default SideBlock
