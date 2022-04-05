import { setNodes, setGraphNodes, setGraphEdges, setOverlayPanelVisible, setUnsortedNodes } from './state/actions'
import Organizer from './services/Organizer'

export default function runAlgorithm(dispatch, relations, nodes, requiredStructure) {
    if (relations[0] && nodes[0] && requiredStructure[0]) {
        const importanceTable = Organizer.getImportanceTable(nodes, relations)
        const sortedNodeTable = Organizer.sort(importanceTable, requiredStructure)

        // Update nodes levels
        let newNodes = []
        sortedNodeTable.sortedNodes.forEach(node => 
            newNodes.push({
                id: node.id,
                peopleCount: node.peopleCount,
                level: node.level,
            })
        )
        sortedNodeTable.unsortedNodes.forEach(node => 
            newNodes.push({
                id: node.id,
                peopleCount: node.peopleCount,
                level: node.level,
            })
        )
        dispatch(setNodes(newNodes))

        // Update unsorted nodes
        let unsortedNodes = []
        sortedNodeTable.unsortedNodes.forEach(unsortedNode => 
            unsortedNodes.push({
                id: unsortedNode.id,
                peopleCount: unsortedNode.peopleCount,
                level: unsortedNode.level
            })    
        )
        dispatch(setUnsortedNodes(unsortedNodes))

        // Set graph nodes
        let graphNodes = []
        sortedNodeTable.sortedNodes.forEach(currentNode => {
            graphNodes.push({ 
                id: currentNode.id,
                label: currentNode.id,
                color: Organizer.getColor(currentNode.level),
                level: currentNode.level,
            })
        })
        dispatch(setGraphNodes(graphNodes))

        // Set graph edges
        let graphEdges = []
        relations.forEach(relation => {
            const graphNode = graphNodes.find(node => node.label === relation.dept_id_from)
            graphEdges.push({
                id: [relation.dept_id_from, relation.dept_id_to].join("~~~"),
                from: relation.dept_id_from,
                to: relation.dept_id_to,
                // label: relation.weight.toString(),
                color: {
                    color: graphNode ? graphNode.color : '#AAAAAA',
                    opacity: 1.0,
                },
            })
        })
        dispatch(setGraphEdges(graphEdges))

        // TODO
        dispatch(setOverlayPanelVisible(true))
    }
}