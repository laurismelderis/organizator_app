
import React, { Component } from 'react'
import fileType from '../constants/fileType'

class ChooseXLSFile extends Component {
    state = {}

    getFileTypeName(type) {
        if (type === fileType.NODES) return "Nodes"
        if (type === fileType.NODE_INFORMATION) return "Node information"
        if (type === fileType.NODE_STRUCTURE_REQUIREMENTS) return "Node structure requirements"
    }

    render() {
        const { fileType, readExcel, data } = this.props
        if (data[0]) {
            return (
                <div>
                    <h1>File type: { this.getFileTypeName(fileType) }</h1>
                    <input type="file" onChange={(e) => readExcel(e.target.files[0], fileType)}></input>
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
                </div>
            )
        }
        
        return (
            <div>
                <h1>File type: { this.getFileTypeName(fileType) }</h1>
                <input type="file" onChange={(e) => readExcel(e.target.files[0], fileType)}></input>
            </div>
        )
    }
}

export default ChooseXLSFile