import React, { Component } from "react";

import Graph from "react-graph-vis"

const options = {
    layout: {
      hierarchical: true,
      improvedLayout: true
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
                <Graph graph={ graph } options={options} style={{ height: "100vh" }} />
            </React.Fragment>
        )
    }
}

export default NodeGraph