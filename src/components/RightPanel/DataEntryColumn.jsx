import React, { useCallback } from 'react'
import ScrollableTable from '../common/ScrollableTable'
import Signalizer from '../common/Signalizer'
import { nameForType } from '../../constants/fileType'
import ErrorMsg from '../common/ErrorMsg'
import ChooseXLSFile from "./ChooseXLSFile"
import './DataEntryColumn.css'

function DataEntryColumn(props) {
    const { data, fileType, validationError } = props

    const handleIsGood = useCallback(() => {
        return Object.keys(props.validationError).length === 0 &&
            data.body.length !== 0
    })

    return (
        <div className="data-entry-column">
            <ChooseXLSFile
                fileType={fileType}
                className="data-entry-column_file-picker"
            />
            <div className="data-entry-column_table">
                <ScrollableTable 
                    headings={data.headings}
                    body={data.body}
                    className="data-entry-column_table"
                />
            </div>
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