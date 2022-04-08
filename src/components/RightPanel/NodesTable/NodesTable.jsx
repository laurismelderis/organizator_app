import React, { useState } from 'react'

import "../../common/ScrollableTable.css"
import "../DataEntryColumn.css"

import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setNodes } from '../../../state/actions'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NodesEditableRow from './NodesEditableRow'
import NodesReadOnlyRow from './NodesReadOnlyRow'

function NodesTable(props) {
    const dispatch = useDispatch()

    const [nodes, relations] = useSelector(state => [state.nodes, state.relations])

    const classes = ['scrollable-table'].concat((props.className || '').split(' '));

    const headings = ["ID", "Cilv. sk.", "Stāvs", "OBL"]
    let body = props.data.body

    const [colAttribute, setColAttribute] = useState(null)
    const [isAscending, setIsAscending] = useState(null)

    const [editNodeId, setEditNodeId] = useState(null)
    const [editNodeData, setEditNodeData] = useState({
        id: "",
        peopleCount: 0,
        level: 0,
        forced: false,
    })

    const handleAddData = () => {
        const newData = _.cloneDeep(body) || []
        let newId = newData.length + 1

        while (_.some(newData, {id: newId.toString()})) {
            newId++
        }

        const newNode = {
            id: newId.toString(),
            peopleCount: 0,
            level: 0,
            forced: false,
        }

        newData.push(newNode)
        dispatch(setNodes(newData))
        setIsAscending(null)
    }

    const handleEditClick = (event, node) => {
        event.preventDefault()

        setEditNodeId(node.id)
        setEditNodeData(node)
    }

    const handleEditNodeChange = (event, prevNode) => {
        const nodeName = event.target.getAttribute("Name")
        const nodeValue = event.target.value
        const newNodeData = { ...editNodeData }
        if (nodeName === 'forced') {
            newNodeData[nodeName] = event.target.checked
        } else {
            newNodeData[nodeName] = nodeValue
        }

        setEditNodeData(newNodeData)
    }

    const handleEditNodeSubmit = (event, prevNode) => {
        event.preventDefault()

        
        let newNode = _.cloneDeep(editNodeData)
        let id = newNode.id
        let peopleCount = parseInt(newNode.peopleCount)
        let level = parseInt(newNode.level)
        let forced = newNode.forced

        let errorMsg = ""
        
        // Check whether the node id is available
        if (_.some(nodes, { id}) && id !== editNodeId) {
            errorMsg += `Struktūrvienība ar nosaukumu ${id} jau pastāv! `
            id = prevNode.id
        }

        // Check whether peopleCount or level are integers
        if ( ! Number.isInteger(peopleCount)) {
            errorMsg += "Cilvēku skaitam ir jābūt veselam skaitlim. "
            peopleCount = prevNode.peopleCount
        }
        if ( ! Number.isInteger(level)) {
            errorMsg += "Stāvam ir jābūt veselam skaitlim. "
            level = prevNode.level
        }

        // Check whether peopleCount or level are negative integers
        if (peopleCount < 0) {
            errorMsg += "Cilvēku skaits nedrīkst būt negatīvs. "
            peopleCount = prevNode.peopleCount
        }
        if (level < 0) {
            errorMsg += "Stāvs nedrīkst būt negatīvs. "
            level = prevNode.level
        }

        const editedNode = {id, peopleCount, level, forced}
        
        const newNodes = _.cloneDeep(nodes)
        const index = newNodes.findIndex(node => node.id === editNodeId)

        newNodes[index] = editedNode

        // Alert user about errors if any appeared
        if (errorMsg !== "") {
            alert(errorMsg)
        }

        dispatch(setNodes(newNodes))
        setEditNodeId(null)
        
    }

    const handleDeleteClick = (event, node) => {
        event.preventDefault()
        const newNodes = _.cloneDeep(nodes)

        
        // let shouldDeleteWithRelations = window.confirm("Vai jūs vēlaties noņemt struktūrvienību kopā ar tā saistītajām attiecībām?")
        // console.log(shouldDeleteWithRelations)
        

        _.remove(newNodes, node)
        dispatch(setNodes(newNodes))
    }

    const handleEditNodeCancel = () => {
        setEditNodeId(null)
    }

    
    if (isAscending === true && colAttribute !== null) {
        body = _.orderBy(body, (a) => a[colAttribute], ['asc'])
    } else if (isAscending === false && colAttribute !== null) {
        body = _.orderBy(body, (a) => a[colAttribute], ['desc'])
    }

    return (
        <>
            <div className="data-entry-column_table">
                <table className={classes.join(' ')}>
                    <thead>
                        <tr>
                            {headings.map((heading, index) => (
                                <th 
                                    key={index}
                                    onClick={() => {
                                        if (body[0]) {
                                            setColAttribute(Object.keys(body[0])[index])
                                            setIsAscending(isAscending === null ? true : !isAscending)
                                        }
                                    }}
                                    style={{cursor: "pointer"}}
                                >
                                    {heading + " "}<FontAwesomeIcon icon={faChevronDown} />
                                </th>
                            ))}
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {body[0]
                            ? body.map((node, index) => (
                                <tr key={index}>
                                    {node.id === editNodeId
                                        ? <NodesEditableRow 
                                            node={node}
                                            editNodeData={editNodeData}
                                            handleEditNodeChange={handleEditNodeChange}
                                            handleEditNodeSubmit={handleEditNodeSubmit}
                                            handleEditNodeCancel={handleEditNodeCancel}
                                        />
                                        : <NodesReadOnlyRow 
                                            node={node}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    }
                                </tr>
                            ))
                            : null
                        }
                    </tbody>
                </table>
            </div>
            <button 
                style={{width:'100%', background: '#AAAAAA'}}
                onClick={handleAddData}
            >+</button>
        </>
    )
}

export default NodesTable