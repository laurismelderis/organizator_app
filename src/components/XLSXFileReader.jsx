import fileType from '../constants/fileType'

import React, { Component } from 'react'
import ChooseXLSFile from './ChooseXLSFile'

class XLSXFileReader extends Component {
    render() {
        let { relations, information, requiredStructure, readExcel } = this.props

        return (
            <div>
                <ChooseXLSFile
                    readExcel={readExcel}
                    data={relations}
                    fileType={fileType.NODES}
                />
                <ChooseXLSFile 
                    readExcel={readExcel}
                    data={information}
                    fileType={fileType.NODE_INFORMATION}
                />
                <ChooseXLSFile
                    readExcel={readExcel}
                    data={requiredStructure}
                    fileType={fileType.NODE_STRUCTURE_REQUIREMENTS}
                />
            </div>
        )
    }

}

export default XLSXFileReader