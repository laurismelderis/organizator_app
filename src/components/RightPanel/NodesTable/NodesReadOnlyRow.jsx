import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faRemove } from '@fortawesome/free-solid-svg-icons'

function NodesReadOnlyRow({ node, handleEditClick, handleDeleteClick }) {
    return (
        <>
            <td>{node.id}</td>
            <td>{node.peopleCount}</td>
            <td>{node.level}</td>
            <td>{node.forced === true 
                ? "O"
                : null
            }</td>
            <td>
                <button style={{width: "100%"}} onClick={(event) => handleEditClick(event, node)}>
                    <FontAwesomeIcon icon={faPencil} />
                </button>
            </td>
            <td>
                <button style={{background: "#FF3333", width: "100%"}} onClick={(event) => handleDeleteClick(event, node)} >
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </td>
        </>
    )
}

export default NodesReadOnlyRow