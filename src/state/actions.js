export const SET_OPTIMIZED_GRAPH = "setOptimizedGraph"
export const SET_HIERARCHICAL_GRAPH = "setHierarchicalGraph"
export const SET_OVERLAY_PANEL_VISIBLE = "setOverlayPanelVisible"
export const GRAPH_NODE_SELECTED = "graphNodeSelected"
export const GRAPH_NODE_UNSELECTED = "graphNodeUnselected"

export const setOptimizedGraph = (value) => ({ type: SET_OPTIMIZED_GRAPH, value })
export const setHierarchicalGraph = (value) => ({ type: SET_HIERARCHICAL_GRAPH, value })
export const setOverlayPanelVisible = (value) => ({ type: SET_OVERLAY_PANEL_VISIBLE, value })
export const graphNodeSelected = (nodeId) => ({ type: GRAPH_NODE_SELECTED, nodeId })
export const graphNodeUnselected = () => ({ type: GRAPH_NODE_UNSELECTED })