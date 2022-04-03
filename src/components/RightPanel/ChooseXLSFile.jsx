import React, { Component } from 'react'
import fileType from '../../constants/fileType'

import Table from '../common/Table'

class ChooseXLSFile extends Component {
    state = {}

    uploadFile() {
        console.log("Clicked")
        document.getElementById("chooseXLSFile").click()
    }

    getFileTypeName(type) {
        if (type === fileType.NODES) return "Nodes"
        if (type === fileType.NODE_INFORMATION) return "Node information"
        if (type === fileType.NODE_STRUCTURE_REQUIREMENTS) return "Node structure requirements"
    }

    render() {
        const { fileType, onChooseFile, data } = this.props
        if (data[0]) {
            return (
                <React.Fragment>
                    <input type="file" onChange={(e) => onChooseFile(e.target.files[0], fileType)}></input>
                    <Table data={data}/>
                </React.Fragment>
            )
        }
        
        return (
            <React.Fragment>
                <button
                    onClick={this.uploadFile.bind(this)}
                >
                    Izvēlies struktūrvienību failu
                </button>
                <input
                    id="chooseXLSFile"
                    style={{display: "none"}}
                    type="file"
                    onChange={(e) => onChooseFile(e.target.files[0], fileType).bind(this)}
                />
            </React.Fragment>
        )
    }
}

export default ChooseXLSFile