import React from 'react'
import { useSelector } from 'react-redux'

import { mergeClassNames } from '../../utils'

import FileType from '../../constants/fileType'

import "./DataEntryPanel.css"
import DataEntryColumn from './DataEntryColumn'
import RadioGroup from '../common/RadioGroup'

export default function DataEntryPanel(props) {
    const className = mergeClassNames(props.className, "data-entry-panel")
    
    const [relations, nodes, requiredStructure] =
        useSelector(state => [state.relations, state.nodes, state.requiredStructure])
    
    const [relationsValid, nodesValid, requiredStructureValid] =
        useSelector(state => [state.relationsValid, state.nodesValid, state.requiredStructureValid])

    return (
        <div className={className}>
            <div className="data-entry-columns">
                <DataEntryColumn
                    fileType={FileType.NODES}
                    data={{
                        headings: ["Saite no", "Saite uz", "Svars"],
                        body: relations,
                    }}
                    validationError={relationsValid}
                />
                <DataEntryColumn
                    fileType={FileType.NODE_INFORMATION}
                    data={{
                        headings: ["ID", "Cilvēku sk.", "Līmenis"],
                        body: nodes,
                    }}
                    validationError={nodesValid}
                />
                <DataEntryColumn
                    fileType={FileType.NODE_STRUCTURE_REQUIREMENTS}
                    data={{
                        headings: ["Līmenis", "Kapacitāte"],
                        body: requiredStructure,
                    }}
                    validationError={requiredStructureValid}
                />
            </div>
            <div className="data-entry-accessories">
                <RadioGroup className="data-entry_settings" />
                <div/>
            </div>
        </div>
    )
}
