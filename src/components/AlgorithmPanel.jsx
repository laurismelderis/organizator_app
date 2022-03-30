import React, { Component } from 'react'
import Organizer from '../services/Organizer'

import ImportanceTable from './ImportanceTable'
import SortedNodeTable from './SortedNodeTable'
import NodeGraph from './NodeGraph'
import Button from './common/Button'

class AlgorithmPanel extends Component {
    state = {
        importanceTableInformation: [],
        sortedNodeTableInformation: [],
        colors: ['#FF0000', '#FF007F', '#FFC27F'],
        nodes: [],
        edges: []

    }

    updateInformation = ({ information, relations, requiredStructure}) => {
        let importanceTableInformation = []
        if (information[0] && relations[0]) {
            importanceTableInformation = Organizer.getImportanceInformation(information, relations)
            this.setState({ importanceTableInformation })
        }
        if (importanceTableInformation[0] && requiredStructure[0]) {
            const sortedNodeTableInformation = Organizer.sort(importanceTableInformation, requiredStructure)
            this.updateNodes(relations, sortedNodeTableInformation)
            this.updateEdges(relations, sortedNodeTableInformation)
            this.setState({ sortedNodeTableInformation })
        }
    }

    updateNodes(relations, sortedNodeTableInformation) {
        let nodes = []
        if (relations[0] && sortedNodeTableInformation[0]) {
            sortedNodeTableInformation.forEach(currentNode => {
                nodes.push({ 
                    id: currentNode.id,
                    label: currentNode.id,
                    color: this.state.colors[currentNode.level - 1]
                })
            })
            this.setState({ nodes })
        }
    }

    updateEdges(relations, sortedNodeTableInformation) {
        let edges = []
        if (relations[0] && sortedNodeTableInformation[0]) {
            relations.forEach(relation => {
                edges.push({
                    from: relation.dept_id_from,
                    to: relation.dept_id_to,
                    label: relation.weight
                })
            })
            this.setState({ edges })
        }
    }

    render () {
        const { importanceTableInformation, sortedNodeTableInformation } = this.state
        return (
            <React.Fragment>
                <Button text={"Execute"} onClick={() => {
                    if (!this.props.relations[0]) console.warn("No node relations provided")
                    if (!this.props.information[0]) console.warn("No node information provided")
                    if (!this.props.requiredStructure[0]) console.warn("No node structure requirements provided")
                    
                    this.updateInformation(this.props)
                }}/>
                <ImportanceTable 
                    data={importanceTableInformation}
                />
                <SortedNodeTable 
                    data={sortedNodeTableInformation}
                />
                <NodeGraph nodes={this.state.nodes} edges={this.state.edges}/>
            </React.Fragment>
        )
    }
}

export default AlgorithmPanel