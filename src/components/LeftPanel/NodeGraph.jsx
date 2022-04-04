import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Graph from "react-graph-vis"

import { graphNodeSelected, graphNodeUnselected } from "../../state/actions"

// const defaultOptions = {
//     autoResize: true,
//     layout: {
//         hierarchical: true,
//         improvedLayout: true,
//         levelSeparation: 80
//     },
//     edges: {
//       color: "#000000",
//     },
// }


// CHECK THIS SHII
// https://codesandbox.io/s/react-graph-vis-example-forked-mdlsn?file=/src/ForceGraph.js


const selected = "red",
      unselected = "silver";

const defaultOptions = {
    layout: {
      randomSeed: 1,
      improvedLayout: false
    },
    physics: {
      stabilization: {
        iterations: 2
      },
      barnesHut: {
        gravitationalConstant: -23910,
        centralGravity: 1.1,
        springLength: 145,
        springConstant: 0.095,
        damping: 0.63,
        avoidOverlap: 0
      },
      minVelocity: 0.75
    },
    nodes: {
      shape: "dot",
      size: 30,
      font: {
        size: 12,
        color: "#ffffff",
        face: "GothamSSm-Book, helvetica, arial, sans"
      },
      borderWidth: 2
    },
    edges: {
      width: 2,
      color: "#fff",
      smooth: { type: "continuous" }
    },
    groups: {
      enablingSelected: {
        color: selected
      },
      terminalSelected: {
        color: selected
      },
      skillSelected: {
        color: selected
      },
      roleSelected: {
        color: selected
      },
      enabling: { color: unselected },
      terminal: { color: unselected },
      skill: { color: unselected }
    }
  };

export default function NodeGraph(props) {
    let dispatch = useDispatch();
    let events = useMemo(() => {
        return {
            click: (event) => {
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