import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { mergeClassNames } from '../../utils'

import FileType from '../../constants/fileType'
import { ERROR_CODE } from '../../constants/errorCodes'

import { setOverlayPanelVisible } from '../../state/actions'

import "./DataEntryPanel.css"
import DataEntryColumn from './DataEntryColumn'
import RadioGroup from '../common/RadioGroup'

export default function DataEntryPanel(props) {
    const className = mergeClassNames(props.className, "data-entry-panel")
    const dispatch = useDispatch()
    const overlayPanelVisible = useSelector((state) => state.showOverlayPanel)
    const showOverlay = useCallback(() => {
        dispatch(setOverlayPanelVisible(true))
    }, [dispatch, setOverlayPanelVisible])

    return (
        <div className={className}>
            <div className="data-entry-columns">
                <DataEntryColumn
                    onChooseFile={() => {}}
                    fileType={FileType.NODES}
                    data={{
                        headings: ["Saite no", "Saite uz", "Svars", "Līmenis", "X"],
                    }}
                    validationError={ERROR_CODE.NOT_XLSX}
                />
                <DataEntryColumn
                    onChooseFile={() => {}}
                    fileType={FileType.NODE_INFORMATION}
                    data={{
                        headings: ["Saite no", "Saite uz", "Svars", "Līmenis", "X"],
                    }}
                    validationError={null}
                />
                <DataEntryColumn
                    onChooseFile={() => {}}
                    fileType={FileType.NODE_STRUCTURE_REQUIREMENTS}
                    data={{
                        headings: ["Saite no", "Saite uz", "Svars", "Līmenis", "X"],
                    }}
                    validationError={null}
                />
            </div>
            <div className="data-entry-accessories">
                {/* <ChooseXLSFile
                    onChooseFile={onChooseFile}
                    data={relations}
                    fileType={FileType.NODES}
                />
                <ChooseXLSFile 
                    onChooseFile={onChooseFile}
                    data={information}
                    fileType={FileType.NODE_INFORMATION}
                />
                <ChooseXLSFile
                    onChooseFile={onChooseFile}
                    data={requiredStructure}
                    fileType={FileType.NODE_STRUCTURE_REQUIREMENTS}
                />
                <ScrollableTable 
                    headings={["Saite no", "Saite uz", "Svars", ""]}
                />
                <ScrollableTable 
                    headings={["Saite no", "Saite uz", "Svars", ""]}
                />
                <ScrollableTable 
                    headings={["Saite no", "Saite uz", "Svars", ""]}
                />
                <Signalizer text={"Attiecības"} isGood={true}/>
                <Signalizer text={"Struktūrvienības"} isGood={true}/>
                <Signalizer text={"Struktūra"} isGood={true}/>
                <ErrorMsg errorCode={ERROR_CODE.NOT_XLSX}/>
                <ErrorMsg errorCode={ERROR_CODE.WRONG_TEMPLATE}/>
                <ErrorMsg errorCode={ERROR_CODE.WRONG_TEMPLATE}/> */}
                <div>
                    <RadioGroup />
                </div>
                <div>
                    <button onClick={showOverlay}>parādīt pārklāju</button>
                </div>
            </div>
            {/* <div className='right-lower-container'>
                <div className='right-lower-title'>
                    <h1>{"Nosaukums"}</h1>
                    <h2>Cilvēku skaits: {"X"}</h2>
                </div>
                <h1>
                    Attiecības
                </h1>
                <ScrollableTable 
                    headings={["Saite no", "Saite uz", "Svars", ""]}
                />
            </div> */}
        </div>
    )
}
