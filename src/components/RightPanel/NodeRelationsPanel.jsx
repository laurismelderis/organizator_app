import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { graphNodeUnselected, setRelations, setNodes } from '../../state/actions'

import _, { cloneDeep } from 'lodash'
import ReadOnlyRow from '../common/ReadOnlyRow'
import EditableRow from '../common/EditableRow'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faChevronDown } from '@fortawesome/free-solid-svg-icons'

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
    const [nodeRelations, setNodeRelations] = useState(
        relations.filter(relation => relation.dept_id_from === nodeId)
    )
    
    const requiredStructure = useSelector(state => state.requiredStructure)
    
    const [editFormData, setEditFormData] = useState({
        dept_id_from: nodeId,
        dept_id_to: "",
        weight: 0,
    })
    const [editPeopleCountData, setEditPeopleCountData] = useState(peopleCount)
    const [editNodeId, setEditNodeId] = useState(null)
    const [editPeopleCount, setEditPeopleCount] = useState(false)
    const [isEditingLevel, setIsEditingLevel] = useState(false)
    const [editLevel, setEditLevel] = useState(level)

    const [isNodeAscending, setIsNodeAscending] = useState(true)
    const [isWeightAscending, setIsWeightAscending] = useState(true)

    const handleAddNode = () => {
        const newRelations = cloneDeep(relations)
        const lastId = _.max(_.map(relations, 'id'))
        newRelations.push({dept_id_from: nodeId, dept_id_to: "", weight: 0, id: lastId + 1})
        dispatch(setRelations(newRelations))
        setNodeRelations(newRelations.filter(relation => relation.dept_id_from === nodeId))
    }

    const handleEditClick = (event, nodeRelation) => {
        event.preventDefault()
        setEditNodeId(nodeRelation.id)

        const formValues = {
            dept_id_from: nodeId,
            dept_id_to: nodeRelation.dept_id_to,
            weight: nodeRelation.weight,
        }

        setEditFormData(formValues)
    }

    const handleEditPeopleCountData = (event) => {
        event.preventDefault()

        setEditPeopleCountData(event.target.value)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault()
        const nodeName = event.target.getAttribute("name")
        const nodeValue = event.target.value

        const newFormData = { ...editFormData }
        newFormData[nodeName] = nodeValue

        setEditFormData(newFormData)
    }

    const handleEditPeopleCountDataSubmit = (event) => {
        event.preventDefault()
        
        if ( ! Number.isInteger(parseInt(editPeopleCountData))) {
            setEditPeopleCount(false)
            setEditPeopleCountData(peopleCount)
            return
        }

        const newNodes = cloneDeep(nodes)
        const editNode = newNodes.find(node => node.id === nodeId)
        editNode.peopleCount = parseInt(editPeopleCountData)

        dispatch(setNodes(newNodes))
        setEditPeopleCount(false)
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault()

        let currentWeight = parseInt(editFormData.weight)

        if ( ! Number.isInteger(currentWeight)) {
            currentWeight = 0
        }

        if (currentWeight < 0) alert("Lūdzu ievadiet svaru lielāku par 0")

        const editedNode = {
            dept_id_from: nodeId,
            dept_id_to: editFormData.dept_id_to,
            weight: currentWeight,
            id: editNodeId,
        }

        const newRelations = cloneDeep(relations)

        const index = relations.findIndex(node => node.id === editNodeId)

        newRelations[index] = editedNode
        dispatch(setRelations(newRelations))
        setNodeRelations(newRelations.filter(relation => relation.dept_id_from === nodeId))
        setEditNodeId(null)
    }

    const handleCancelClick = () => {
        setEditNodeId(null)
    }

    const handleDeleteClick = (event, nodeRelation) => {
        event.preventDefault()
        const updatedRelations = cloneDeep(relations)
        _.remove(updatedRelations, {
            dept_id_from: nodeRelation.dept_id_from,
            dept_id_to: nodeRelation.dept_id_to,
            id: nodeRelation.id,
        })
        dispatch(setRelations(updatedRelations))
        setNodeRelations(updatedRelations.filter(relation => relation.dept_id_from === nodeId))
    }

    const handleEditPeopleCount = () => {
        setEditPeopleCount(!editPeopleCount)
        setEditPeopleCountData(peopleCount)
    }

    const handleIsEditingLevel = () => {
        setIsEditingLevel(!isEditingLevel)
        setEditLevel(level)
    }

    const handleEditLevelChange = (event) => {
        event.preventDefault()

        setEditLevel(event.target.value)
    }

    const handleEditLevelSubmit = (event) => {
        event.preventDefault()

        if ( ! Number.isInteger(parseInt(editLevel))) {
            alert('Ievadiet lūdzu skaitli')
            handleIsEditingLevel()
            return
        }

        const levelFound = requiredStructure.find(structure => structure.level === parseInt(editLevel))
        if ( ! levelFound && parseInt(editLevel) !== 0) {
            alert('Stāvs nepastāv')
            handleIsEditingLevel()
            return
        }

        const newNodes = cloneDeep(nodes)
        const editNode = newNodes.find(node => node.id === nodeId)
        editNode.level = parseInt(editLevel)

        dispatch(setNodes(newNodes))
        setIsEditingLevel(false)
    }

    const levelCurrentPeopleCount = _.sumBy(nodes.filter(node => node.level ===  level), 'peopleCount')
    const levelCapacity = level 
        ? requiredStructure.find(structure => structure.level === level).capacity
        : "?"
    
    return (
        <div className={props.className}>
            <button onClick={goBack}
                style={{
                    position: 'absolute',
                    right: '1em',
                    top: '4em',
                }}>Atpakaļ</button>
            <h1>{nodeId}</h1>
            <h2>
                Cilvēku skaits:{" "}
                {editPeopleCount 
                    ? <>
                        <input
                            type="text"
                            placeholder='cilv. sk.'
                            required="required"
                            name="peopleCount"
                            value={editPeopleCountData}
                            onChange={handleEditPeopleCountData}
                        />
                        {" "}
                        <button onClick={handleEditPeopleCountDataSubmit}>Saglabāt</button>
                        {" "}
                        <button onClick={handleEditPeopleCount}>Atcelt</button>
                    </>
                    : <>
                        {peopleCount + " "}
                        <button onClick={handleEditPeopleCount}>
                            <FontAwesomeIcon icon={faPencil}/>
                        </button>
                    </>
                } 
            </h2>
            <h2>
                Stāvs: {" "}
                {isEditingLevel
                    ? <>
                        <input 
                            type="text"
                            placeholder="līmenis"
                            required="required"
                            name="level"
                            value={editLevel}
                            onChange={handleEditLevelChange}
                        />
                        {" "}
                        <button onClick={handleEditLevelSubmit}>Saglabāt</button>
                        {" "}
                        <button onClick={handleIsEditingLevel}>Atcelt</button>
                    </>
                    : <>
                        {level + " "}
                        <button onClick={handleIsEditingLevel}>
                            <FontAwesomeIcon icon={faPencil}/>
                        </button>
                    </>
                }
                {" "}
                (Ietilpība: <span className={levelCurrentPeopleCount <= levelCapacity ? 'compatible' : 'incompatible'}>{levelCurrentPeopleCount} / {levelCapacity}</span>)
            </h2>
            <h1>Attiecības</h1>
            <table>
                <thead>
                    <tr>
                        <th
                            onClick={() => {
                                if (nodeRelations[0]) {
                                    if (isNodeAscending) {
                                        setNodeRelations(_.orderBy(nodeRelations, (a) => a['dept_id_to'], ['asc']))
                                    } else {
                                        setNodeRelations(_.orderBy(nodeRelations, (a) => a['dept_id_to'], ['desc']))
                                    }
                                }
                                setIsNodeAscending(!isNodeAscending)
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Saite uz <FontAwesomeIcon icon={faChevronDown} />
                        </th>
                        <th
                            onClick={() => {
                                if (nodeRelations[0]) {
                                    if (isWeightAscending) {
                                        setNodeRelations(_.orderBy(nodeRelations, (a) => a['weight'], ['asc']))
                                    } else {
                                        setNodeRelations(_.orderBy(nodeRelations, (a) => a['weight'], ['desc']))
                                    }
                                }
                                setIsWeightAscending(!isWeightAscending)
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Svars <FontAwesomeIcon icon={faChevronDown} />
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {nodeRelations.map((nodeRelation, index) => (
                        <tr key={index}>
                            {editNodeId === nodeRelation.id
                                ? <EditableRow
                                    nodeRelations={nodeRelations}
                                    editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleEditFormSubmit={handleEditFormSubmit}
                                    handleCancelClick={handleCancelClick}
                                />
                                : <ReadOnlyRow 
                                    nodeRelation={nodeRelation}
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}
                                />
                            }
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
    ) 
    
}