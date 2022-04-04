import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Graph from "react-graph-vis"

import { graphNodeSelected, graphNodeUnselected } from "../../state/actions"

const defaultOptions = {
    autoResize: true,
    layout: {
      hierarchical: true,
      improvedLayout: true
    },
    edges: {
      color: "#000000",
    },
}

export default function NodeGraph(props) {
    let dispatch = useDispatch();
    let events = useMemo(() => {
        return {
            click: (event) => {
                console.log(event)
                if (('nodes' in event) && event.nodes.length > 0) {
                    dispatch(graphNodeSelected(event.nodes[0]));
                }
            },
        };
    }, [dispatch]);

    const graphNodes = useSelector(state => state.graphNodes)
    const graphEdges = useSelector(state => state.graphEdges)
    const hierarchicalGraph = useSelector(state => state.hierarchicalGraph)

    return <Graph
        graph={{ nodes: graphNodes, edges: graphEdges }}
        options={{...defaultOptions, layout: { hierarchical: hierarchicalGraph }}}
        events={events}
        _dummyWidth={props.width}
    />
}