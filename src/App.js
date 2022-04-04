import './App.css';
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import * as XLSX from 'xlsx'

import FileType from './constants/fileType'
import NavBar from './components/NavBar/NavBar'
import LeftPanel from './components/LeftPanel/LeftPanel';
import OverlayPanel from './components/LeftPanel/OverlayPanel';
import RightPanelSwitcher from './components/RightPanel/RightPanelSwitcher';
import store from './state/state.js';

class App extends Component {
    state = {
        relations: [],
        information: [],
        requiredStructure: [],
        nodes: [],
        edges: [],
        windowWidth: window.innerWidth
    }

    componentDidMount() {
        window.onresize = () => {
            this.setState({ windowWidth: window.innerWidth })
        }     
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
            if (p_fileType === FileType.NODES) this.setState({ relations: data })
            if (p_fileType === FileType.NODE_INFORMATION) this.setState({ information: data })
            if (p_fileType === FileType.NODE_STRUCTURE_REQUIREMENTS) this.setState({ requiredStructure: data })
        })
    }

    render() {
        let { relations, information, requiredStructure } = this.state
        return (
            <Provider store={store}>
                <NavBar />
                <div className="main-container">
                    <div className="left-panel">
                        <LeftPanel width={this.state.windowWidth}/>
                        <OverlayPanel />
                    </div>
                    <RightPanelSwitcher
                        className="main-container_right"
                        relations={relations}
                        information={information}
                        requiredStructure={requiredStructure}
                        onChooseFile={this.chooseFile}
                    />
                </div>
            </Provider>
        )
    }
}

export default App;
