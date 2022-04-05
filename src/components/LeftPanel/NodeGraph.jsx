import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Graph from "react-graph-vis"
import { cloneDeep } from 'lodash'

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
      improvedLayout: false,
      randomSeed: 1
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
    // groups: {
    //   enablingSelected: {
    //     color: selected
    //   },
    //   terminalSelected: {
    //     color: selected
    //   },
    //   skillSelected: {
    //     color: selected
    //   },
    //   roleSelected: {
    //     color: selected
    //   },
    //   enabling: { color: unselected },
    //   terminal: { color: unselected },
    //   skill: { color: unselected }
    // }c
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

    const graphEdges = useSelector(state => state.graphEdges);
    const graphNodes = useSelector((state) => state.graphNodes);
    const hierarchicalGraph = useSelector(state => state.hierarchicalGraph)

    const selectedNodeId = useSelector(state => state.selectedGraphNodeId);
    const nodeNeighbours = useMemo(() => {
        let neighbourMap = new Map();
        graphNodes.forEach((node) => {
            // debugger;
            let neighbours = new Set();
            graphEdges.forEach((edge) => {
                if (edge.to === node.id) {
                    neighbours.add(edge.from);
                }
            });
            neighbourMap.set(node.id, neighbours);
        });
        return neighbourMap;
    }, [graphEdges]);
    const highlightGraphNodes = useMemo(() => {
        if (selectedNodeId === null) {
            return graphNodes.map((node) => {
                node = cloneDeep(node);
                node.opacity = 1.0;
                return node;
            });
        }
        return graphNodes.map((node) => {
            node = cloneDeep(node);
            if (node.id === selectedNodeId) {
                node.opacity = 1.0;
                return node;
            }
            let neighbours = nodeNeighbours.get(node.id);
            // debugger;
            if ( ! neighbours.has(selectedNodeId)) {
                node.opacity = 0.1;
            } else {
                node.opacity = 1.0;
            }
            return node;
        });
    }, [selectedNodeId, graphEdges, graphNodes, nodeNeighbours]);
    const highlightGraphEdges = useMemo(() => {
        if (selectedNodeId === null) {
            return graphEdges;
        }
        return graphEdges.map((edge) => {
            if (edge.from !== selectedNodeId) {
                edge = cloneDeep(edge);
                edge.color.opacity = 0.0;
                return edge;
            }
            return edge;
        });
    }, [selectedNodeId, graphEdges]);

    return <Graph
        graph={{ nodes: highlightGraphNodes, edges: highlightGraphEdges }}
        options={{...defaultOptions, layout: { hierarchical: hierarchicalGraph }}}
        events={events}
        _dummyWidth={props.width}
    />
}