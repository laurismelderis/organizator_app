import React from 'react'
import NodeGraph from './NodeGraph'
import CONSTANTS from '../../constants/defaults'

function LeftPanel(props) {
    const nodes = props.nodes ? props.nodes : CONSTANTS.nodes
    const edges = props.edges ? props.edges : CONSTANTS.edges
    return (
        <NodeGraph nodes={nodes} edges={edges}/>
    )
}

export default LeftPanel