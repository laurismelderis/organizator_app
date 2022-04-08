import React, { useState } from 'react'

import "../../common/ScrollableTable.css"
import "../DataEntryColumn.css"

import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { setRelations } from '../../../state/actions'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RelationTable(props) {
    const dispatch = useDispatch()

    const classes = ['scrollable-table'].concat((props.className || '').split(' '));

    const headings = ["Saite no", "Saite uz", "Svars", "ID"]
    let body = props.data.body

    const [colAttribute, setColAttribute] = useState(null)
    const [isAscending, setIsAscending] = useState(null)

    const handleAddData = () => {
        const newData = _.cloneDeep(body) || []
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
                        </tr>
                    </thead>
                    <tbody>
                        {body[0]
                            ? body.map((row, rIndex) => {
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
        </>
    )
}

export default RelationTable