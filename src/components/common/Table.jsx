import React from 'react'

const Table = (props) => {
    const { data} = props
    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key, index) => (
                            <th scope="col" key={ index }>{ key }</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={ index }>
                            {Object.keys(data[0]).map((key, index) => (
                                <th scope="col" key={ index }>{ row[key] }</th>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Table