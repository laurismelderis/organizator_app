import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

function EditableRow({nodeRelation, nodeRelations, editFormData, handleEditFormChange, handleEditFormSubmit, handleCancelClick}) {
    const nodes = useSelector(state => state.nodes)
    
    let possibleNodesTo = []
    nodes.forEach(node => {
        if (node.id !== editFormData.dept_id_from) {
            possibleNodesTo.push(node.id)
        }
    })
    possibleNodesTo = possibleNodesTo.filter(nodeTo => {
        return ! _.map(nodeRelations, "dept_id_to").includes(nodeTo)
    })

    possibleNodesTo.push(nodeRelations.dept_id_to)

    possibleNodesTo = _.compact(possibleNodesTo.sort())

    return (
        <>
            <td>
                <select
                    defaultValue={editFormData.dept_id_to}
                    name="dept_id_to"
                    onChange={handleEditFormChange}
                >
                    <option value={editFormData.dept_id_to}>{editFormData.dept_id_to}</option>
                    {possibleNodesTo.map((nodeTo) => {
                        return <option 
                            value={nodeTo}
                            key={nodeTo}
                        >
                            {nodeTo}
                        </option>
                    })}
                </select>
            </td>
            <td>
                <input 
                    type="text"
                    required="required"
                    placeholder='Svars'
                    name="weight"
                    value={editFormData.weight}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <button type='submit' onClick={(event) => handleEditFormSubmit(event, nodeRelation)}>Saglabāt</button>
            </td>
            <td>
                <button type='submit' onClick={handleCancelClick}>Atcelt</button>
            </td>
        </>
    )
}

export default EditableRow