export const SET_OPTIMIZED_GRAPH = "setOptimizedGraph"
export const SET_HIERARCHICAL_GRAPH = "setHierarchicalGraph"
export const SET_OVERLAY_PANEL_VISIBLE = "setOverlayPanelVisible"
export const SET_RELATIONS_VALID = "setRelationsValid"
export const SET_NODES_VALID = "setNodesValid"
export const SET_REQUIRED_STRUCTURE_VALID = "setRequiredStructureValid"
export const SET_RELATIONS = "setRelations"
export const SET_NODES = "setNodes"
export const SET_UNSORTED_NODES = "setUnsortedNodes"
export const SET_REQUIRED_STRUCTURE = "setRequiredStructure"
export const SET_GRAPH_NODES = "setGraphNodes"
export const SET_GRAPH_EDGES = "setGraphEdges"
export const GRAPH_NODE_SELECTED = "graphNodeSelected"
export const GRAPH_NODE_UNSELECTED = "graphNodeUnselected"

export const setOptimizedGraph = (value) => ({ type: SET_OPTIMIZED_GRAPH, value })
export const setHierarchicalGraph = (value) => ({ type: SET_HIERARCHICAL_GRAPH, value })
export const setOverlayPanelVisible = (value) => ({ type: SET_OVERLAY_PANEL_VISIBLE, value })
export const setRelationsValid = (value) => ({ type: SET_RELATIONS_VALID, value })
export const setNodesValid = (value) => ({ type: SET_NODES_VALID, value })
export const setRequiredStructureValid = (value) => ({ type: SET_REQUIRED_STRUCTURE_VALID, value })
export const setRelations = (relations) => ({ type: SET_RELATIONS, relations})
export const setNodes = (nodes) => ({ type: SET_NODES, nodes})
export const setUnsortedNodes = (unsortedNodes) => ({ type: SET_UNSORTED_NODES, unsortedNodes })
export const setRequiredStructure = (requiredStructure) => ({ type: SET_REQUIRED_STRUCTURE, requiredStructure})
export const setGraphNodes = (graphNodes) => ({ type: SET_GRAPH_NODES, graphNodes })
export const setGraphEdges = (graphEdges) => ({ type: SET_GRAPH_EDGES, graphEdges })
export const graphNodeSelected = (nodeId) => ({ type: GRAPH_NODE_SELECTED, nodeId })
export const graphNodeUnselected = () => ({ type: GRAPH_NODE_UNSELECTED })