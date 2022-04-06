import React from 'react'
import { useSelector } from 'react-redux'

import { mergeClassNames } from '../../utils'

import FileType from '../../constants/fileType'

import "./DataEntryPanel.css"
import DataEntryColumn from './DataEntryColumn'
import RadioGroup from '../common/RadioGroup'
import { sumBy } from 'lodash'

export default function DataEntryPanel(props) {
    const className = mergeClassNames(props.className, "data-entry-panel")
    
    const [relations, nodes, requiredStructure] =
        useSelector(state => [state.relations, state.nodes, state.requiredStructure])
    
    const [relationsValid, nodesValid, requiredStructureValid] =
        useSelector(state => [state.relationsValid, state.nodesValid, state.requiredStructureValid])

    if (nodes[0] && requiredStructure[0]) {
        requiredStructure.map(structure => {
            structure.peopleCount = sumBy(nodes.filter(node => node.level ===  structure.level), 'peopleCount')
        })
    }

    console.log(nodes)

    return (
        <div className={className}>
            <div className="data-entry-columns">
                <DataEntryColumn
                    fileType={FileType.NODES}
                    data={{
                        headings: ["Saite no", "Saite uz", "Svars", "ID"],
                        body: relations,
                    }}
                    validationError={relationsValid}
                />
                <DataEntryColumn
                    fileType={FileType.NODE_INFORMATION}
                    data={{
                        headings: ["ID", "Cilvēku sk.", "Stāvs", 'OBL'],
                        body: nodes,
                    }}
                    validationError={nodesValid}
                />
                <DataEntryColumn
                    fileType={FileType.NODE_STRUCTURE_REQUIREMENTS}
                    data={{
                        headings: ["Stāvs", "Kapacitāte", "Aizpildījums"],
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
