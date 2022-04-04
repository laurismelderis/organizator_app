import { configureStore } from '@reduxjs/toolkit';
import * as A from './actions';

function createInitialState() {
    return {
        selectedGraphNodeId: null,
        optimizedGraph: false,
        hierarchicalGraph: false,
        showOverlayPanel: false,
    }
}

export function reducer(state = createInitialState(), action) {
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

export default configureStore({
    reducer: reducer,
});