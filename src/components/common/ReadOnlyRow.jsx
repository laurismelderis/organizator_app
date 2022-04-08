import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faPencil } from '@fortawesome/free-solid-svg-icons'

function ReadOnlyRow({ nodeRelation, handleEditClick, handleDeleteClick }) {
    return (
        <>
            <td>{nodeRelation.dept_id_to}</td>
            <td>{nodeRelation.weight}</td>
            <td>
                <button onClick={(event) => handleEditClick(event, nodeRelation) } >
                    <FontAwesomeIcon icon={faPencil} />
                </button>
            </td>
            <td>
                <button style={{background: "#FF3333"}} onClick={(event) => handleDeleteClick(event, nodeRelation) } >
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </td>
        </>
    )
}

export default ReadOnlyRow