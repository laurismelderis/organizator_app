import React, { Component } from "react";

import Graph from "react-graph-vis"

const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000",
    }
}

class NodeGraph extends Component {
    state = {
        graph: {
            nodes: this.props.nodes,
            edges: this.props.edges
        }
    }

    render() {
        const { graph } = this.state
        return (
            <React.Fragment>
                <h1>React graph vis</h1>
                <Graph graph={ graph } options={options} style={{ height: "640px" }} />
            </React.Fragment>
        )
    }
}

export default NodeGraph