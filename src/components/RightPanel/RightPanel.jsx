import React from 'react'

import ScrollableTable from '../common/ScrollableTable'
import Signalizer from '../common/Signalizer'
import ErrorMsg from '../common/ErrorMsg'

import fileType from '../../constants/fileType'
import { ERROR_CODE } from '../../constants/errorCodes'

import ChooseXLSFile from "./ChooseXLSFile"

import "./RightPanel.css"

function SideBar(props) {
    const { onChooseFile, relations, information, requiredStructure } = props

    console.log(relations)

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
                <ErrorMsg errorCode={ERROR_CODE.WRONG_TEMPLATE}/>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='right-lower-container'>
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
            </div>
        </div>
    )
}

export default SideBar
