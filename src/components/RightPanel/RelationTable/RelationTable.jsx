import React, { useState } from 'react'

import "../../common/ScrollableTable.css"
import "../DataEntryColumn.css"

import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setRelations } from '../../../state/actions'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RelationTable(props) {
    const dispatch = useDispatch()

    const classes = ['scrollable-table'].concat((props.className || '').split(' '));

    const headings = ["Saite no", "Saite uz", "Svars", "ID"]
    let bodyRelations = props.data.body

    const [colAttribute, setColAttribute] = useState(null)
    const [isAscending, setIsAscending] = useState(null)

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

    const handleDeleteLastData = () => {
        const newRelations = _.cloneDeep(bodyRelations)
        newRelations.pop()

        dispatch(setRelations(newRelations))
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
                                    key={index}
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
                        </tr>
                    </thead>
                    <tbody>
                        {bodyRelations[0]
                            ? bodyRelations.map((row, rIndex) => {
                                return (
                                    <tr key={rIndex}>
                                        {Object.values(row).map((item, iIndex) => (
                                            <td key={rIndex+iIndex}>
                                                {item}
                                            </td>
                                        ))}
                                    </tr>
                                )})
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