import React, { Component } from 'react'
import Organizer from '../services/Organizer'

import ImportanceTable from './ImportanceTable'
import SortedNodeTable from './SortedNodeTable'
import Button from './common/Button'

class AlgorithmPanel extends Component {
    state = {
        importanceTableInformation: [],
        sortedNodeTableInformation: []
    }

    updateInformation = ({ information, relations, requiredStructure}) => {
        let importanceTableInformation = []
        if (information[0] && relations[0]) {
            importanceTableInformation = Organizer.getImportanceInformation(information, relations)
            this.setState({ importanceTableInformation })
        }
        if (importanceTableInformation[0] && requiredStructure[0]) {
            const sortedNodeTableInformation = Organizer.sort(importanceTableInformation, requiredStructure)
            this.setState({ sortedNodeTableInformation })
        }
    }


    render () {
        const { importanceTableInformation, sortedNodeTableInformation } = this.state

        return (
            <React.Fragment>
                <ImportanceTable 
                    data={importanceTableInformation}
                />
                <SortedNodeTable 
                    data={sortedNodeTableInformation}
                />
                <Button text={"Execute"} onClick={() => {
                    if (!this.props.relations[0]) console.warn("No node relations provided")
                    if (!this.props.information[0]) console.warn("No node information provided")
                    if (!this.props.requiredStructure[0]) console.warn("No node structure requirements provided")

                    this.updateInformation(this.props)
                }}/>
            </React.Fragment>
        )
    }
}

export default AlgorithmPanel