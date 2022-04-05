import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { mergeClassNames } from '../../utils'
import { graphNodeUnselected, setRelations } from '../../state/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faPencil } from '@fortawesome/free-solid-svg-icons'
import _, { cloneDeep } from 'lodash'

export default function NodeRelationsPanel(props) {
    const dispatch = useDispatch();
    const goBack = useCallback(() => {
        dispatch(graphNodeUnselected());
    }, [dispatch]);

    const nodeId = useSelector(state => state.selectedGraphNodeId)
    const nodes = useSelector(state => state.nodes)

    const peopleCount = nodes.find(node => node.id === nodeId).peopleCount
    const level = nodes.find(node => node.id === nodeId).level

    const relations = useSelector(state => state.relations)
    const nodeRelations = relations.filter(relation => relation.dept_id_from === nodeId)

    const handleAddNode = () => {
        const newRelations = cloneDeep(relations)
        newRelations.push({dept_id_from: nodeId, dept_id_to: "", weight: ""})
        dispatch(setRelations(newRelations))
    }

    const handleChangeNode = () => {

    }

    const handleDeleteNode = (nodeRelation) => {
        const updatedRelations = cloneDeep(relations)
        _.remove(updatedRelations, {
            dept_id_from: nodeRelation.dept_id_from,
            dept_id_to: nodeRelation.dept_id_to,
        })
        dispatch(setRelations(updatedRelations))
    }

    return <div className={props.className}>
        <button onClick={goBack}
            style={{
                position: 'absolute',
                right: '1em',
                top: '4em',
            }}>Atpakaļ</button>
        <h1>{nodeId}</h1>
        <h2>Cilvēku skaits: {peopleCount}</h2>
        <h2>Līmenis: {level}</h2>
        <h1>Attiecības</h1>
        <table>
            <thead>
                <tr>
                    <th>Saite uz</th>
                    <th>Svars</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {nodeRelations.map((nodeRelation, index) => (
                    <tr key={index}>
                        <td>{nodeRelation.dept_id_to}</td>
                        <td>{nodeRelation.weight}</td>
                        <td>
                            <button style={{background: "blue"}} onClick={handleChangeNode}>
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                        </td>
                        <td>
                            <button style={{background: "red"}} onClick={() => handleDeleteNode(nodeRelation)}>
                                <FontAwesomeIcon icon={faRemove} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button 
            style={{width: "50%", background: "#AAAAAA"}}
            onClick={handleAddNode}
        >
            +
        </button>
    </div>
}