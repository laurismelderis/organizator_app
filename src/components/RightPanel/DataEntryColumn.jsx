import React from 'react'
import ScrollableTable from '../common/ScrollableTable'
import Signalizer from '../common/Signalizer'
import { nameForType } from '../../constants/fileType'
import ErrorMsg from '../common/ErrorMsg'
import ChooseXLSFile from "./ChooseXLSFile"
import './DataEntryColumn.css'

function DataEntryColumn(props) {
  return (
    <div className="data-entry-column">
        <ChooseXLSFile
            onChooseFile={props.onChooseFile}
            fileType={props.fileType}
            className="data-entry-column_file-picker"
        />
        <div className="data-entry-column_table">
            <ScrollableTable 
                headings={props.data.headings}
                className="data-entry-column_table"
            />
        </div>
        <Signalizer text={nameForType(props.fileType)}
            isGood={props.validationError === null}
            className="data-entry-column_signalizer"
        />
        <ErrorMsg
            errorCode={props.validationError}
            className="data-entry-column_error-msg"
        />
    </div>
  )
}

export default DataEntryColumn