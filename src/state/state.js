import { configureStore } from '@reduxjs/toolkit';
import * as A from './actions';

function createInitialState() {
    return {
        selectedGraphNodeId: null,
        optimizedGraph: false,
        hierarchicalGraph: true,
        showOverlayPanel: false,
        relationsValid: {},
        nodesValid: {},
        requiredStructureValid: {},
        relations: [],
        nodes: [],
        requiredStructure: [],
        graphNodes: [],
        graphEdges: [],
    }
}

export function reducer(state = createInitialState(), action) {
    function reduce() {
        switch (action.type) {
            case A.SET_OPTIMIZED_GRAPH: {
                return { ...state, optimizedGraph: action.value }
            }
            case A.SET_HIERARCHICAL_GRAPH: {
                return { ...state, hierarchicalGraph: action.value }
            }
            case A.SET_OVERLAY_PANEL_VISIBLE: {
                return { ...state, showOverlayPanel: action.value }
            }
            case A.SET_RELATIONS_VALID: {
                return { ...state, relationsValid: action.value }
            }
            case A.SET_NODES_VALID: {
                return { ...state, nodesValid: action.value }
            }
            case A.SET_REQUIRED_STRUCTURE_VALID: {
                return { ...state, requiredStructureValid: action.value }
            }
            case A.SET_RELATIONS: {
                return { ...state, relations: action.relations }
            }
            case A.SET_NODES: {
                return { ...state, nodes: action.nodes }
            }
            case A.SET_REQUIRED_STRUCTURE: {
                return { ...state, requiredStructure: action.requiredStructure }
            }
            case A.SET_GRAPH_NODES: {
                return { ...state, graphNodes: action.graphNodes }
            }
            case A.SET_GRAPH_EDGES: {
                return { ...state, graphEdges: action.graphEdges }
            }
            case A.GRAPH_NODE_SELECTED: {
                return { ...state, selectedGraphNodeId: action.nodeId }
            }
            case A.GRAPH_NODE_UNSELECTED: {
                return { ...state, selectedGraphNodeId: null }
            }
            default: {
                return state
            }
        }
    }
    return Object.freeze(reduce())
}

export default configureStore({
    reducer: reducer,
});