import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Graph from "react-graph-vis"
import { cloneDeep } from 'lodash'

import { graphNodeSelected, graphNodeUnselected } from "../../state/actions"
import Organizer from "../../services/Organizer"

const defaultOptions = {
    autoResize: true,
    layout: {
        improvedLayout: false,
        randomSeed: 1,
    },
    physics: {
        enabled: false
    },
    edges: {
        width: 2,
        smooth: { type: "continuous" }
    },
}

export default function NodeGraph(props) {
    let dispatch = useDispatch()
    let events = useMemo(() => {
        return {
            click: (event) => {
                if (('nodes' in event) && event.nodes.length > 0) {
                    dispatch(graphNodeSelected(event.nodes[0]))
                }
            },
        }
    }, [dispatch])

    
    const [relations, nodes] = useSelector(state =>  [state.relations, state.nodes])

    const graphNodes = () => {
        let graphNodes = []
        nodes.forEach(currentNode => {
            graphNodes.push({ 
                id: currentNode.id,
                label: (currentNode.id + '\n(' + currentNode.peopleCount + ') ' + `[${currentNode.level}]`),
                color: Organizer.getColor(currentNode.level),
                level: currentNode.level,
            })
        })
        return graphNodes
    }

    const graphEdges = () => {
        let graphEdges = []
        if (relations[0]) {
            relations.forEach(relation => {
                const graphNode = graphNodes().find(node => node.id === relation.dept_id_from)
                if (relation.dept_id_to && relation.dept_id_from) {
                    graphEdges.push({
                        id: [relation.dept_id_from, relation.dept_id_to].join("~~~"),
                        from: relation.dept_id_from,
                        to: relation.dept_id_to,
                        color: {
                            color: graphNode ? graphNode.color : '#AAAAAA',
                            opacity: 1.0,
                        },
                    })
                }
            })
        }
        return graphEdges
    }

    const hierarchicalGraph = useSelector(state => state.hierarchicalGraph)

    const selectedNodeId = useSelector(state => state.selectedGraphNodeId)

    const nodeNeighbours = useMemo(() => {
        let neighbourMap = new Map()
        graphNodes().forEach((node) => {
            let neighbours = new Set()
            graphEdges().forEach((edge) => {
                if (edge.to === node.id) {
                    neighbours.add(edge.from)
                }
            })
            neighbourMap.set(node.id, neighbours)
        })
        return neighbourMap
    }, [graphEdges])
    const highlightGraphNodes = useMemo(() => {
        if (selectedNodeId === null) {
            return graphNodes().map((node) => {
                node = cloneDeep(node)
                node.opacity = 1.0
                return node
            })
        }
        return graphNodes().map((node) => {
            node = cloneDeep(node)
            if (node.id === selectedNodeId) {
                node.opacity = 1.0
                return node
            }
            let neighbours = nodeNeighbours.get(node.id)
            if ( ! neighbours.has(selectedNodeId)) {
                node.opacity = 0.1
            } else {
                node.opacity = 1.0
            }
            return node
        })
    }, [selectedNodeId, graphEdges, graphNodes, nodeNeighbours])
    const highlightGraphEdges = useMemo(() => {
        if (selectedNodeId === null) {
            return graphEdges()
        }
        return graphEdges().map((edge) => {
            if (edge.from !== selectedNodeId) {
                edge = cloneDeep(edge)
                edge.color.opacity = 0.0
                return edge
            }
            return edge
        })
    }, [selectedNodeId, graphEdges])

    return <Graph
        graph={{ nodes: highlightGraphNodes, edges: highlightGraphEdges }}
        options={{...defaultOptions, layout: { hierarchical: { enabled: hierarchicalGraph,  direction: "DU"} }}}
        events={events}
        _dummyWidth={props.width}
    />
}