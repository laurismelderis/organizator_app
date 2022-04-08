import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function NodesEditableRow({ node, editNodeData, handleEditNodeChange, handleEditNodeSubmit, handleEditNodeCancel }) {
    return (
        <>
            <td>
                <input 
                    style={{width: "90%"}}
                    type="text"
                    placeholder='ID'
                    required="required"
                    name="id"
                    value={ editNodeData.id }
                    onChange={handleEditNodeChange}
                />
            </td>
            <td>
                <input 
                    style={{width: "90%"}}
                    type="text"
                    placeholder='Cilv.sk.'
                    required="required"
                    name="peopleCount"
                    value={ editNodeData.peopleCount }
                    onChange={handleEditNodeChange}
                />
            </td>
            <td>
                <input 
                    style={{width: "90%"}}
                    type="text"
                    placeholder='Stāvs'
                    required="required"
                    name="level"
                    value={ editNodeData.level }
                    onChange={handleEditNodeChange}
                />
            </td>
            <td>
                <input 
                    type="checkbox"
                    required="required"
                    name="forced"
                    checked={ editNodeData.forced }
                    onChange={handleEditNodeChange}
                />
            </td>
            <td>
                <button style={{width: "100%"}} onClick={(event) => handleEditNodeSubmit(event, node)} >
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </td>
            <td>
                <button style={{width: "100%"}} onClick={handleEditNodeCancel} >
                    {"<"}
                </button>
            </td>
        </>
    )
}

export default NodesEditableRow