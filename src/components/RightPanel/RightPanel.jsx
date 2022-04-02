import React from 'react'

import fileType from '../../constants/fileType'
import ChooseXLSFile from "./ChooseXLSFile"
import "./RightPanel.css"

function SideBar(props) {
    const { onChooseFile, relations, information, requiredStructure } = props

    return (
        <div className='right-container'>
            <div className='right-upper-container'>
                {/* <div className='file-choose'> */}
                    <ChooseXLSFile
                        onChooseFile={onChooseFile}
                        data={relations}
                        fileType={fileType.NODES}
                    />
                {/* </div> */}
                {/* <div className='file-choose'> */}
                    <ChooseXLSFile 
                        onChooseFile={onChooseFile}
                        data={information}
                        fileType={fileType.NODE_INFORMATION}
                    />
                {/* </div> */}
                {/* <div className='file-choose'> */}
                    <ChooseXLSFile
                        onChooseFile={onChooseFile}
                        data={requiredStructure}
                        fileType={fileType.NODE_STRUCTURE_REQUIREMENTS}
                    />
                {/* </div> */}
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
        </div>
    )
}

export default SideBar
