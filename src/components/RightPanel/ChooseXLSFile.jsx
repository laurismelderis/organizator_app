import React, { Component } from 'react'
import FileType from '../../constants/fileType'

import Table from '../common/Table'

import './ChooseXLSFile.css'

class ChooseXLSFile extends Component {
    state = {}

    uploadFile() {
        console.log("Clicked")
        document.getElementById("chooseXLSFile").click()
    }

    getFileTypeName(type) {
        if (type === FileType.NODES) return "Nodes"
        if (type === FileType.NODE_INFORMATION) return "Node information"
        if (type === FileType.NODE_STRUCTURE_REQUIREMENTS) return "Node structure requirements"
    }

    render() {
        const { fileType, onChooseFile, data } = this.props
        
        return (
            <div className={this.props.className || undefined}>
                <button
                    className="choose-file-btn"
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
            </div>
        )
    }
}

export default ChooseXLSFile