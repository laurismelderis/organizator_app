import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faRemove } from '@fortawesome/free-solid-svg-icons'

function RelationReadOnlyRow({relation, handleEditClick, handleDeleteClick}) {
    return (
        <>
            <td>{relation.dept_id_from}</td>
            <td>{relation.dept_id_to}</td>
            <td>{relation.weight}</td>
            <td>
                <button style={{width: "100%"}} onClick={(event) => handleEditClick(event, relation)}>
                    <FontAwesomeIcon icon={faPencil} />
                </button>
            </td>
            <td>
                <button style={{background: "#FF3333", width: "100%"}} onClick={(event) => handleDeleteClick(event, relation)} >
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </td>
        </>
    )
}

export default RelationReadOnlyRow