import React from 'react'

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RequiredStructureReadOnlyRow({ structure, handleEditClick }) {
    return (
        <>
            <td>{structure.level}</td>
            <td>{structure.capacity}</td>
            <td>{structure.peopleCount}</td>
            <td>
                <button onClick={(event) => handleEditClick(event, structure)}>
                    <FontAwesomeIcon icon={faPencil} />
                </button>
            </td>
        </>
    )
}

export default RequiredStructureReadOnlyRow