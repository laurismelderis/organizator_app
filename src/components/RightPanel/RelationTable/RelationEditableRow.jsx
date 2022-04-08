import React from 'react'

import { useSelector } from 'react-redux'
import _ from 'lodash'

import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function RelationEditableRow({ relation, editRelationData, handleEditRelationChange, handleEditRelationSubmit, handleEditRelationCancel }) {
    const nodes = useSelector(state => state.nodes)
    const relations = useSelector(state =>  state.relations)

    let possibleNodesFrom = []
    let possibleNodesTo = []

    nodes.forEach(node => {
        possibleNodesFrom.push(node.id)
    })

    for (let i = 0; i < possibleNodesFrom.length; i++) {
        const copy = _.cloneDeep(possibleNodesFrom)
        const currentElement = copy.splice(i, 1)
        const elementCurrentRelations = relations.filter((relation) => relation.dept_id_from === currentElement[0])
        const elementCurrentRelationNodesTo = _.map(elementCurrentRelations, 'dept_id_to')
        if (_.isEqual(copy.sort(), elementCurrentRelationNodesTo.sort())) {
            _.remove(possibleNodesFrom, (nodeFrom) => nodeFrom === currentElement[0])
        }
    }

    possibleNodesFrom.sort()

    if (editRelationData.dept_id_from !== "") {
        const nodeFromRelations = _.map(relations.filter(relation => relation.dept_id_from === editRelationData.dept_id_from), "dept_id_to")
        _.remove(nodeFromRelations, (nodeFrom) => nodeFrom === editRelationData.dept_id_to)
        nodes.forEach(node => {
            if (node.id !== editRelationData.dept_id_from) {
                possibleNodesTo.push(node.id)
            }
        })
        possibleNodesTo = possibleNodesTo.filter((nodeTo) => 
            ! _.includes(nodeFromRelations, nodeTo)
        )
        possibleNodesTo = _.compact(possibleNodesTo.sort())
    }
    
    return (
        <>
            <td>
                <select
                    defaultValue={editRelationData.dept_id_from}
                    name="dept_id_from"
                    onChange={handleEditRelationChange}
                >
                    {possibleNodesFrom.map((nodeFrom, index) => (
                        <option key={index} value={nodeFrom}>{nodeFrom}</option>
                    ))}
                </select>
            </td>
            <td>
                <select
                    defaultValue={editRelationData.dept_id_to}
                    name="dept_id_to"
                    onChange={handleEditRelationChange}
                >
                    {possibleNodesTo.map((nodeTo, index) => (
                        <option key={index} value={nodeTo}>{nodeTo}</option>
                    ))}
                </select>
            </td>
            <td>
                <input 
                    style={{width: "90%"}}
                    type="text"
                    placeholder='Svars'
                    required="required"
                    name="weight"
                    value={ editRelationData.weight }
                    onChange={handleEditRelationChange}
                />
            </td>
            <td>
                <button style={{width: "100%"}} onClick={(event) => handleEditRelationSubmit(event, relation)}>
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </td>
            <td>
                <button style={{width: "100%"}} onClick={handleEditRelationCancel} >
                    {"<"}
                </button>
            </td>
        </>
    )
}

export default RelationEditableRow