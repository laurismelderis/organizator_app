import React, { useState } from 'react'

import "./ScrollableTable.css"
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash'

function ScrollableTable(props) {
    const { headings } = props
    let body = props.body
    const classes = ['scrollable-table'].concat((props.className || '').split(' '));

    const [colAttribute, setColAttribute] = useState(null)
    const [isAsceding, setIsAscending] = useState(true)


    if (colAttribute !== null) {
        body = isAsceding 
                ? _.orderBy(body, (a) => a[colAttribute], ['asc'])
                : _.orderBy(body, (a) => a[colAttribute], ['desc'])
    }

    return (
        <table className={classes.join(' ')}>
            <thead>
                <tr>
                    {headings.map((heading, index) => (
                        <th 
                            key={index}
                            onClick={() => {
                                if (body[0]) {
                                    setColAttribute(Object.keys(body[0])[index])
                                    setIsAscending(!isAsceding)
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
                                        {item === true
                                            ? <span>O</span>
                                            : item
                                        }
                                    </td>
                                ))}
                            </tr>
                        )})
                    : null
                }
            </tbody>
        </table>
    )
}

export default ScrollableTable