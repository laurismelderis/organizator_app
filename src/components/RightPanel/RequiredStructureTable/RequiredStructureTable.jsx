import React, { useState } from 'react'

import "../../common/ScrollableTable.css"
import "../DataEntryColumn.css"

import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setRequiredStructure } from '../../../state/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import RequiredStructureEditableRow from './RequiredStructureEditableRow'
import RequiredStrucureReadOnlyRow from './RequiredStructureReadOnlyRow'

function RequiredStructureTable(props) {
    const dispatch = useDispatch()

    const requiredStructure = useSelector(state => state.requiredStructure)
    const classes = ['scrollable-table'].concat((props.className || '').split(' '));

    const headings = ["Stāvs", "Kapacitāte", "Aizpildījums"]
    let body = props.data.body

    const [colAttribute, setColAttribute] = useState(null)
    const [isAscending, setIsAscending] = useState(null)
    const [editCapacityId, setEditCapacityId] = useState(null)
    const [editCapacity, setEditCapacity] = useState(0)

    const handleAddData = () => {
        const newData = _.cloneDeep(body) || []
        newData.push({
            level: newData[0] ? _.max(_.map(newData, 'level')) + 1 : 1,
            capacity: 0,
            peopleCount: 0,
        })
        dispatch(setRequiredStructure(newData))
        setIsAscending(null)
    }

    const handleRemoveData = (event) => {
        event.preventDefault()
        const newRequiredStructure = _.cloneDeep(requiredStructure)
        newRequiredStructure.pop()
        dispatch(setRequiredStructure(newRequiredStructure))

    }

    const handleEditClick = (event, structure) => {
        event.preventDefault()

        setEditCapacityId(structure.level)

        setEditCapacity(parseInt(structure.capacity))
    }

    const handleEditCapacityChange = (event) => {
        event.preventDefault()
        
        setEditCapacity(event.target.value)
    }

    const handleEditCapacitySubmit = (event) => {
        event.preventDefault()

        let currentCapacity = parseInt(editCapacity)

        if ( ! Number.isInteger(currentCapacity)) {
            currentCapacity = 0
        }

        if (currentCapacity < 0) alert("Lūdzu ievadiet svaru lielāku par 0")

        const newRequiredStructure = _.cloneDeep(requiredStructure)
        const theNewEditStructure = newRequiredStructure.find(structure => structure.level === editCapacityId)
        theNewEditStructure.capacity = currentCapacity

        dispatch(setRequiredStructure(newRequiredStructure))
        setEditCapacityId(null)
    }

    const handleEditCapacityCancel = () => {
        setEditCapacityId(null)
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
                        </tr>
                    </thead>
                    <tbody>
                        {body[0]
                            ? body.map((structure, index) => (
                                <tr key={index}>
                                    {editCapacityId === structure.level
                                        ? <RequiredStructureEditableRow 
                                            structure={structure}
                                            editCapacity={editCapacity}
                                            handleEditCapacityChange={handleEditCapacityChange}
                                            handleEditCapacitySubmit={handleEditCapacitySubmit}
                                            handleEditCapacityCancel={handleEditCapacityCancel}
                                        />
                                        : <RequiredStrucureReadOnlyRow 
                                            structure={structure}
                                            handleEditClick={handleEditClick}
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
            <button 
                style={{background: '#FF3333', width: '100%'}}
                onClick={handleRemoveData}
            >
                -
            </button>
        </>
    )
}

export default RequiredStructureTable