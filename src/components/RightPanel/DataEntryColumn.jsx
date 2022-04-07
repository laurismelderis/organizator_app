import React, { useCallback } from 'react'
import ScrollableTable from '../common/ScrollableTable'
import Signalizer from '../common/Signalizer'
import FileType, { nameForType } from '../../constants/fileType'
import ErrorMsg from '../common/ErrorMsg'
import ChooseXLSFile from "./ChooseXLSFile"
import './DataEntryColumn.css'
import { useDispatch } from 'react-redux'
import { setRelations } from '../../state/actions'
import _ from 'lodash'

function DataEntryColumn(props) {
    const { data, fileType, validationError } = props

    const dispatch = useDispatch()

    const handleIsGood = useCallback(() => {
        return Object.keys(props.validationError).length === 0 &&
            data.body.length !== 0
    })

    const handleAddData = () => {
        if (fileType === FileType.NODES) {
            const newData = _.cloneDeep(data.body) || []
            let newId
            if (newData[0]) {
                newId = _.max(_.map(newData, 'id')) + 1
            } else {
                newId = 1
            }
            newData.push({
                dept_id_from: '',
                dept_id_to: '',
                weight: 0,
                id: newId
            })
            dispatch(setRelations(newData))
        }
    }

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
                    fileType={fileType}
                />
            </div>
            <button 
                style={{width:'100%', background: '#AAAAAA'}}
                onClick={handleAddData}
            >+</button>
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