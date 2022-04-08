import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './NavBar.css'

import runAlgorithm from '../../algorithm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRemove } from '@fortawesome/free-solid-svg-icons'
import * as XLSX from 'xlsx'
import _ from 'lodash'

import { RELATIONS_TEMPLATE, NODES_TEMPLATE, REQUIRED_STRUCTURE_TEMPLATE } from '../../constants/xlsxTemplate'

function NavBar() {
    const dispatch = useDispatch()
    const [isAlgoSuccessful, setIsAlgoSuccessful] = useState(null)
    const [relations, nodes, requiredStructure] =
        useSelector((state) => [state.relations, state.nodes, state.requiredStructure])
    const doRunAlgorithm = useMemo(() => {
        return runAlgorithm.bind(null, dispatch, relations, nodes, requiredStructure, setIsAlgoSuccessful)
    }, [dispatch, relations, nodes, requiredStructure])

    let algoIndicator

    if (isAlgoSuccessful === true) {
        algoIndicator = <p className="algo-success"><FontAwesomeIcon icon={faCheck}/></p>
    } else if (isAlgoSuccessful === false) {
        algoIndicator = <p className="algo-failed"><FontAwesomeIcon icon={faRemove}/></p>
    } else {
        algoIndicator = null
    }

    const handleExportRelations = () => {
        if (_.isEmpty(relations)) return

        let relationsCopy = _.cloneDeep(relations)
        relationsCopy = relationsCopy.map((relation) => _.omit(relation, 'id'))

        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(relationsCopy)

        XLSX.utils.book_append_sheet(wb, ws, "Relations")
        XLSX.writeFile(wb, "attiecibas.xlsx")
    }
    const handleExportNodes = () => {
        if (_.isEmpty(nodes)) return

        let nodesCopy = []
        nodes.forEach(node => {
            nodesCopy.push({ ...node, forced: node.forced ? 'y' : 'n'})
        })
        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(nodesCopy)

        XLSX.utils.book_append_sheet(wb, ws, "Nodes")
        XLSX.writeFile(wb, "stukturvienibas.xlsx")
    }
    const handleExportRequiredStructure = () => {
        if (_.isEmpty(requiredStructure)) return

        let requiredStructureCopy = _.cloneDeep(requiredStructure)
        requiredStructureCopy = requiredStructureCopy.map((structure) => _.omit(structure, 'peopleCount'))

        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(requiredStructureCopy)

        XLSX.utils.book_append_sheet(wb, ws, "Structure")
        XLSX.writeFile(wb, "stavi.xlsx")
    }

    const handleExportRelationsTemplate = () => {
        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(RELATIONS_TEMPLATE)

        XLSX.utils.book_append_sheet(wb, ws, "Relations")
        XLSX.writeFile(wb, "attiecibu_sablons.xlsx")
    }
    const handleExportNodesTemplate = () => {
        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(NODES_TEMPLATE)

        XLSX.utils.book_append_sheet(wb, ws, "Nodes")
        XLSX.writeFile(wb, "stukturvienibu_sablons.xlsx")
    }
    const handleExportRequiredStructureTemplate = () => {
        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(REQUIRED_STRUCTURE_TEMPLATE)

        XLSX.utils.book_append_sheet(wb, ws, "Structure")
        XLSX.writeFile(wb, "stavu_sablons.xlsx")
    }

    return (
        <div className="navbar">
            <div className="dropdown">
                <button className="dropbtn">Saglabāt
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <button onClick={handleExportRelations}>Attiecību fails</button>
                    <button onClick={handleExportNodes}>Struktūrvienību fails</button>
                    <button onClick={handleExportRequiredStructure}>Struktūras fails</button>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Šablons
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <button onClick={handleExportRelationsTemplate}>Attiecību fails</button>
                    <button onClick={handleExportNodesTemplate}>Struktūrvienību fails</button>
                    <button onClick={handleExportRequiredStructureTemplate}>Struktūras fails</button>
                </div>
            </div>
            <div className="navbar_right">
                {algoIndicator}
                <button onClick={doRunAlgorithm}>Izpildīt algoritmu</button>
            </div>
        </div>
    )
}

export default NavBar