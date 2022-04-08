import { setNodes, setOverlayPanelVisible, setUnsortedNodes } from './state/actions'
import Organizer from './services/Organizer'
import { isEmpty } from 'lodash'

export default function runAlgorithm(dispatch, relations, nodes, requiredStructure, setIsAlgoSuccessful) {
    setIsAlgoSuccessful(null)

    if (nodes[0] && requiredStructure[0]) {
        const importanceTable = Organizer.getImportanceTable(nodes, relations)
        const sortedNodeTable = Organizer.sort(importanceTable, requiredStructure)


        // Update nodes levels
        let newNodes = []
        sortedNodeTable.sortedNodes.forEach(node => 
            newNodes.push({
                id: node.id,
                peopleCount: node.peopleCount,
                level: node.level,
                forced: node.forced
            })
        )
        sortedNodeTable.unsortedNodes.forEach(node => 
            newNodes.push({
                id: node.id,
                peopleCount: node.peopleCount,
                level: node.level,
                forced: node.forced
            })
        )
        dispatch(setNodes(newNodes))

        // Update unsorted nodes
        let unsortedNodes = []
        sortedNodeTable.unsortedNodes.forEach(unsortedNode => 
            unsortedNodes.push({
                id: unsortedNode.id,
                peopleCount: unsortedNode.peopleCount,
                level: unsortedNode.level,
                forced: unsortedNode.forced
            })    
        )
        dispatch(setUnsortedNodes(unsortedNodes))

        if ( ! isEmpty(unsortedNodes)) {
            dispatch(setOverlayPanelVisible(true))
        } else {
            dispatch(setOverlayPanelVisible(false))
        }

        setIsAlgoSuccessful(true)
    } else {
        setIsAlgoSuccessful(false)
    }
    
}