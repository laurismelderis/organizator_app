import React from 'react'

import "./ScrollableTable.css"

function ScrollableTable(props) {
    const { headings, body } = props
    return (
        <div className="scrollable-table">
            <table>
                <thead>
                    <tr>
                        {headings.map((heading, index) => (
                            <th key={index}>{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* {body.map(row => (
                        <tr>
                            {row.map(item => (
                                <td>{item}</td>
                            ))}
                        </tr>
                    ))} */}
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>d_1</td>
                        <td>d_2</td>
                        <td>5</td>
                        <td>X</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ScrollableTable