import React, { useState } from 'react'

import "../../common/ScrollableTable.css"
import "../DataEntryColumn.css"

import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setRelations } from '../../../state/actions'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RelationEditableRow from './RelationEditableRow'
import RelationReadOnlyRow from './RelationReadOnlyRow'

function RelationTable(props) {
    const dispatch = useDispatch()

    const classes = ['scrollable-table'].concat((props.className || '').split(' '));

    const headings = ["Saite no", "Saite uz", "Svars"]
    let bodyRelations = props.data.body
    const relations = useSelector(state => state.relations)

    const [colAttribute, setColAttribute] = useState(null)
    const [isAscending, setIsAscending] = useState(null)

    const [editRelationId, setEditRelationId] = useState(null)
    const [editRelationData, setEditRelationData] = useState({
        dept_id_from: '',
        dept_id_to: '',
        weight: 0,
        id: 1
    })

    const handleAddData = () => {
        const newData = _.cloneDeep(bodyRelations) || []
        let newId = _.max(_.map(newData, 'id')) + 1 || 1
        newData.push({
            dept_id_from: '',
            dept_id_to: '',
            weight: 0,
            id: newId
        })
        dispatch(setRelations(newData))
        setIsAscending(null)
    }

    const handleEditClick = (event, relation) => {
        event.preventDefault()

        setEditRelationId(relation.id)
        setEditRelationData(relation)
    }

    const handleEditRelationChange = (event) => {
        event.preventDefault()

        const relationName = event.target.getAttribute('name')
        const relationValue = event.target.value

        const newRelationData = { ...editRelationData }
        newRelationData[relationName] = relationValue

        setEditRelationData(newRelationData)
    }

    const handleEditRelationSubmit = (event, prevRelation) => {
        event.preventDefault()

        const newRelation = _.cloneDeep(editRelationData)
        let newWeight = parseInt(newRelation.weight)

        // Check whether the weight is integer
        if ( ! Number.isInteger(newWeight)) {
            alert('Attiecību svaram ir jābūt veselam skaitlim!')
            newWeight = prevRelation.weight
        }
        if (newWeight < 0) {
            alert('Attiecību svars nedrīkst būt negatīvs!')
            newWeight = prevRelation.weight
        }

        const editedRelation = {
            dept_id_from: newRelation.dept_id_from,
            dept_id_to: newRelation.dept_id_to,
            weight: newWeight,
            id:  _.max(_.map(relations, 'id')) + 1 || 1
        }

        const newRelations = _.cloneDeep(relations)
        const index = newRelations.findIndex(relation => relation.id === editRelationId)

        newRelations[index] = editedRelation

        console.log(newRelations)

        dispatch(setRelations(newRelations))
        setEditRelationId(null)
    }

    const handleDeleteClick = (event, relation) => {
        event.preventDefault()

        const newRelations = _.cloneDeep(relations)
        _.remove(newRelations, relation)
        dispatch(setRelations(newRelations))
    }

    const handleDeleteLastData = () => {
        const newRelations = _.cloneDeep(bodyRelations)
        newRelations.pop()

        dispatch(setRelations(newRelations))
    }

    const handleEditRelationCancel = () => {
        setEditRelationId(null)
    }

    
    if (isAscending === true && colAttribute !== null) {
        bodyRelations = _.orderBy(bodyRelations, (a) => a[colAttribute], ['asc'])
    } else if (isAscending === false && colAttribute !== null) {
        bodyRelations = _.orderBy(bodyRelations, (a) => a[colAttribute], ['desc'])
    }

    return (
        <>
            <div className="data-entry-column_table">
                <table className={classes.join(' ')}>
                    <thead>
                        <tr>
                            {headings.map((heading, index) => (
                                <th 
                                    key={'h'+index}
                                    onClick={() => {
                                        if (bodyRelations[0]) {
                                            setColAttribute(Object.keys(bodyRelations[0])[index])
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
                        {bodyRelations[0]
                            ? bodyRelations.map((relation, index) => (
                                <tr key={'r'+index}>
                                    {relation.id === editRelationId
                                        ? <RelationEditableRow
                                            relation={relation}
                                            editRelationData={editRelationData}
                                            handleEditRelationChange={handleEditRelationChange}
                                            handleEditRelationSubmit={handleEditRelationSubmit}
                                            handleEditRelationCancel={handleEditRelationCancel}
                                        />
                                        : <RelationReadOnlyRow 
                                            relation={relation}
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
            <button 
                style={{width:'100%', background: '#FF3333'}}
                onClick={handleDeleteLastData}
            >-</button>
        </>
    )
}

export default RelationTable