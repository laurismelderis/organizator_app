import React from 'react'

import fileType from '../../constants/fileType'
import ChooseXLSFile from "./ChooseXLSFile"

function SideBar(props) {
    const { onChooseFile, relations, information, requiredStructure } = props

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default SideBar