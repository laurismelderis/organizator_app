import React, { useMemo } from "react"
import { useDispatch } from "react-redux"
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
                if (('nodes' in event) && event.nodes.length > 0) {
                    dispatch(graphNodeSelected(event.nodes[0]));
                }
            },
        };
    }, [dispatch]);
    return <Graph
        graph={{ nodes: props.nodes, edges: props.edges }}
        options={defaultOptions}
        events={events}
        _dummyWidth={props.width}
    />
}

// class NodeGraph extends Component {
//     state = {
//         graph: {
//             nodes: this.props.nodes,
//             edges: this.props.edges
//         }
//     }

//     render() {
//         const { graph } = this.state
//         return (
//             <React.Fragment>
//                 <Graph 
//                     graph={ graph }
//                     options={Object.assign({autoResize: Boolean(this.props.width)}, options)}
//                     style={ {} }
//                 />
//             </React.Fragment>
//         )
//     }
// }

// export default NodeGraph