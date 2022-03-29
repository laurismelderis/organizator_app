import React, { Component } from 'react'
import fileType from '../constants/fileType'

import Table from './common/Table'

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
                    <input type="file" onChange={(e) => readExcel(e.target.files[0], fileType)}></input>
                    <Table title={"File type:" + this.getFileTypeName(fileType)} data={data}/>
                </div>
            )
        }
        
        return (
            <div>
                <input type="file" onChange={(e) => readExcel(e.target.files[0], fileType)}></input>
                <h1>File type: { this.getFileTypeName(fileType) }</h1>
            </div>
        )
    }
}

export default ChooseXLSFile