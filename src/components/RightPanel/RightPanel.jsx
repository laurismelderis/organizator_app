import React from 'react'

import fileType from '../../constants/fileType'
import ChooseXLSFile from "./ChooseXLSFile"
import "./RightPanel.css"

function SideBar(props) {
    const { onChooseFile, relations, information, requiredStructure } = props

    return (
        <div className='right-container'>
            <div className='right-upper-container'>
                <ChooseXLSFile
                    onChooseFile={onChooseFile}
                    data={relations}
                    fileType={fileType.NODES}
                />
                <ChooseXLSFile 
                    onChooseFile={onChooseFile}
                    data={information}
                    fileType={fileType.NODE_INFORMATION}
                />
                <ChooseXLSFile
                    onChooseFile={onChooseFile}
                    data={requiredStructure}
                    fileType={fileType.NODE_STRUCTURE_REQUIREMENTS}
                />
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='right-lower-container'>
                <div className='right-lower-title'></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default SideBar
