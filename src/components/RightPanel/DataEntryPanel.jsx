import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { mergeClassNames } from '../../utils'

import FileType from '../../constants/fileType'
import Organizer from '../../services/Organizer'

import { setGraphEdges, setGraphNodes, setOverlayPanelVisible } from '../../state/actions'

import "./DataEntryPanel.css"
import DataEntryColumn from './DataEntryColumn'
import RadioGroup from '../common/RadioGroup'

export default function DataEntryPanel(props) {
    const className = mergeClassNames(props.className, "data-entry-panel")
    const dispatch = useDispatch()
    // const overlayPanelVisible = useSelector((state) => state.showOverlayPanel)
    const showOverlay = useCallback(() => {
        dispatch(setOverlayPanelVisible(true))
    }, [dispatch])

    // const state = useSelector(state => state)
    
    const relations = useSelector(state => state.relations)
    const nodes = useSelector(state => state.nodes)
    const requiredStructure = useSelector(state => state.requiredStructure)
    
    const relationsValid = useSelector(state => state.relationsValid)
    const nodesValid = useSelector(state => state.nodesValid)
    const requiredStructureValid = useSelector(state => state.requiredStructureValid)

    const runAlgorithm = () => {
        if (relations[0] && nodes[0] && requiredStructure[0]) {
            const importanceTable = Organizer.getImportanceTable(nodes, relations)
            const sortedNodeTable = Organizer.sort(importanceTable, requiredStructure)

            // Set graph nodes
            let graphNodes = []
            sortedNodeTable.forEach(currentNode => {
                graphNodes.push({ 
                    id: currentNode.id,
                    label: currentNode.id,
                    color: Organizer.getColor(currentNode.level),
                    level: currentNode.level
                })
            })
            dispatch(setGraphNodes(graphNodes))

            // Set graph edges
            let graphEdges = []
            relations.forEach(relation => {
                graphEdges.push({
                    from: relation.dept_id_from,
                    to: relation.dept_id_to,
                    label: relation.weight.toString()
                })
            })
            dispatch(setGraphEdges(graphEdges))
            showOverlay()
        }
    }
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
                <div>
                    <RadioGroup />
                </div>
                <div>
                    <button onClick={runAlgorithm}>Izpildīt algoritmu</button>
                </div>
            </div>
        </div>
    )
}
