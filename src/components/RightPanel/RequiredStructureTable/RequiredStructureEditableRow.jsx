import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

function RequiredStructureEditableRow({ structure, editCapacity, handleEditCapacityChange, handleEditCapacitySubmit, handleEditCapacityCancel }) {
    return (
        <>
            <td>{structure.level}</td>
            <td>
                <input 
                    style={{width: "80%"}}
                    type="text"
                    placeholder='Kapacitāte'
                    required="required"
                    name="capacity"
                    value={editCapacity}
                    onChange={handleEditCapacityChange}
                />
                <button style={{width: "20%"}} onClick={handleEditCapacitySubmit} >
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </td>
            <td>{structure.peopleCount}</td>
            <td>
                <button style={{width: "100%"}} onClick={handleEditCapacityCancel}>
                    {"<"}
                </button>
            </td>
        </>
    )
}

export default RequiredStructureEditableRow