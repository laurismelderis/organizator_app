import './App.css';
import React, { Component } from 'react'

import * as XLSX from 'xlsx'

import fileType from './constants/fileType'
import NavBar from './components/NavBar/NavBar'
import LeftPanel from './components/LeftPanel/LeftPanel';
import RightPanel from './components/RightPanel/RightPanel';

class App extends Component {
    state = {
        relations: [],
        information: [],
        requiredStructure: [],
        nodes: [],
        edges: []
    }

    chooseFile = (file, p_fileType) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)
            
            fileReader.onload = (e) => {
                const bufferArray = e.target.result
                
                const wb = XLSX.read(bufferArray, { type:'buffer' })
                const wsName = wb.SheetNames[0]
                const ws = wb.Sheets[wsName]
                const data = XLSX.utils.sheet_to_json(ws)
                
                resolve(data)
            }
            
            fileReader.onerror = ((err) => {
                reject(err)
            })
        })

        promise.then((data) => {
            if (p_fileType === fileType.NODES) this.setState({ relations: data })
            if (p_fileType === fileType.NODE_INFORMATION) this.setState({ information: data })
            if (p_fileType === fileType.NODE_STRUCTURE_REQUIREMENTS) this.setState({ requiredStructure: data })
        })
    }

    render() {
        let { relations, information, requiredStructure } = this.state
        return (
            <React.Fragment>
                <div className="container">
                    <NavBar />
                    <div className="leftPanel">
                        <LeftPanel />
                    </div>
                    <div className="rightPanel">
                        <RightPanel relations={relations} information={information} requiredStructure={requiredStructure} onChooseFile={this.chooseFile}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App;
