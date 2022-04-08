import React, { useCallback } from 'react'
import Signalizer from '../common/Signalizer'
import FileType, { nameForType } from '../../constants/fileType'
import ErrorMsg from '../common/ErrorMsg'
import ChooseXLSFile from "./ChooseXLSFile"
import './DataEntryColumn.css'
import { useDispatch } from 'react-redux'

import _ from 'lodash'
import RelationTable from './RelationTable/RelationTable'
import NodesTable from './NodesTable/NodesTable'
import RequiredStructureTable from './RequiredStructureTable/RequiredStructureTable'

function DataEntryColumn(props) {
    const { data, fileType, validationError } = props

    const dispatch = useDispatch()

    const handleIsGood = useCallback(() => {
        return Object.keys(props.validationError).length === 0 &&
            data.body.length !== 0
    })

   
    let table
    if (fileType === FileType.NODES) {
        table = <RelationTable data={data}/>
    } else if (fileType === FileType.NODE_INFORMATION) {
        table = <NodesTable data={data}/>
    } else if (fileType === FileType.NODE_STRUCTURE_REQUIREMENTS) {
        table = <RequiredStructureTable data={data}/>
    }

    return (
        <div className="data-entry-column">
            <ChooseXLSFile
                fileType={fileType}
                className="data-entry-column_file-picker"
            />
            {table}
            <Signalizer text={nameForType(fileType)}
                isGood={handleIsGood()}
                className="data-entry-column_signalizer"
            />
            <ErrorMsg
                errorCode={validationError.error}
                className="data-entry-column_error-msg"
            />
        </div>
    )
}

export default DataEntryColumn