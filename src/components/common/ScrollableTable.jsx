import React from 'react'

import "./ScrollableTable.css"

function ScrollableTable(props) {
    const { headings, body } = props
    const classes = ['scrollable-table'].concat((props.className || '').split(' '));

    return (
        <table className={classes.join(' ')}>
            <thead>
                <tr>
                    {headings.map((heading, index) => (
                        <th key={index}>{heading}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {body.map((row, rIndex) => (
                    <tr key={rIndex}>
                        {Object.values(row).map((item, iIndex) => (
                            <td key={rIndex+iIndex}>{item}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ScrollableTable