import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { graphNodeUnselected, setRelations, setNodes } from '../../state/actions'

import _, { cloneDeep } from 'lodash'
import ReadOnlyRow from '../common/ReadOnlyRow'
import EditableRow from '../common/EditableRow'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faChevronDown, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'

export default function NodeRelationsPanel(props) {
    const dispatch = useDispatch();
    const goBack = useCallback(() => {
        dispatch(graphNodeUnselected());
    }, [dispatch]);

    
    const nodeId = useSelector(state => state.selectedGraphNodeId)
    const nodes = useSelector(state => state.nodes)
    
    const currentNode = nodes.find(node => node.id === nodeId)
    const { peopleCount, level, forced } = currentNode

    const relations = useSelector(state => state.relations)
    let nodeRelations = relations.filter(relation => relation.dept_id_from === nodeId)
    
    const requiredStructure = useSelector(state => state.requiredStructure)
    
    const [editFormData, setEditFormData] = useState({
        id: 0,
        dept_id_from: nodeId,
        dept_id_to: "",
        weight: 0,
    })
    
    const [editPeopleCountData, setEditPeopleCountData] = useState(peopleCount)
    const [editNodeId, setEditNodeId] = useState(null)
    const [editPeopleCount, setEditPeopleCount] = useState(false)
    const [isEditingLevel, setIsEditingLevel] = useState(false)
    const [editLevel, setEditLevel] = useState(level)
    
    const [isAscending, setIsAscending] = useState(null)
    const [colAttribute, setColAttribute] = useState(null)

    const levelCurrentPeopleCount = _.sumBy(nodes.filter(node => node.level ===  level), 'peopleCount')
    const levelStructure = requiredStructure.find(structure => structure.level === level)
    const levelCapacity = levelStructure !== undefined
        ? levelStructure.capacity
        : "?"

    const handleAddNode = () => {
        const newRelations = cloneDeep(relations)
        const lastId = _.max(_.map(relations, 'id')) || 1
        newRelations.push({dept_id_from: nodeId, dept_id_to: "", weight: 0, id: lastId + 1})
        dispatch(setRelations(newRelations))
        setIsAscending(null)
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

    const handleEditFormSubmit = (event, prevRelation) => {
        event.preventDefault()

        let currentWeight = parseInt(editFormData.weight)

        if ( ! Number.isInteger(currentWeight)) {
            alert("Attiecības svars var būt tikai vesels skaitlis!")
            currentWeight = prevRelation.weight
        }

        if (currentWeight < 0) {
            alert("Lūdzu ievadiet svaru lielāku par 0")
            currentWeight = prevRelation.weight
        }

        const editedNode = {
            dept_id_from: nodeId,
            dept_id_to: editFormData.dept_id_to,
            weight: currentWeight,
            id: editNodeId,
        }

        const newRelations = cloneDeep(relations)

        const index = newRelations.findIndex(node => node.id === editNodeId)

        newRelations[index] = editedNode
        dispatch(setRelations(newRelations))
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

        const newNodes = cloneDeep(nodes)
        const editNode = newNodes.find(node => node.id === nodeId)
        editNode.level = parseInt(editLevel)

        dispatch(setNodes(newNodes))
        setIsEditingLevel(false)
    }

    const handleForcedClick = () => {
        const newNodes = cloneDeep(nodes)
        const editNode = newNodes.find(node => node.id === nodeId)
        editNode.forced = !forced

        dispatch(setNodes(newNodes))
    }

    if (isAscending === true && colAttribute !== null) {
        nodeRelations = _.orderBy(nodeRelations, (a) => a[colAttribute], ['asc'])
    } else if (isAscending === false && colAttribute !== null) {
        nodeRelations = _.orderBy(nodeRelations, (a) => a[colAttribute], ['desc'])
    }
    
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
                Darbinieku skaits:{" "}
                {editPeopleCount 
                    ? <>
                        <input
                            type="text"
                            placeholder='darb. sk.'
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
                        {" "}
                        {forced 
                            ? <button style={{background: "#FF3333"}} onClick={handleForcedClick}>
                                <FontAwesomeIcon icon={faLock}/>
                            </button>
                            : <button style={{background: "#2FD42F"}} onClick={handleForcedClick}>
                                <FontAwesomeIcon icon={faUnlock}/>
                            </button>
                        }
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
                                setColAttribute('dept_id_to')
                                setIsAscending(isAscending === null ? true : !isAscending)
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Saite uz <FontAwesomeIcon icon={faChevronDown} />
                        </th>
                        <th
                            onClick={() => {
                                setColAttribute('weight')
                                setIsAscending(isAscending === null ? true : !isAscending)
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
                                    nodeRelation={nodeRelation}
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