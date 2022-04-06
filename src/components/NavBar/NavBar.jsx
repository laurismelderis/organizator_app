import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './NavBar.css'

import runAlgorithm from '../../algorithm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRemove } from '@fortawesome/free-solid-svg-icons'

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

    return (
        <div className="navbar">
        <div className="dropdown">
            <button className="dropbtn">Saglabāt
                <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
                <p>Attiecību fails</p>
                <p>Struktūrvienību fails</p>
                <p>Struktūras fails</p>
            </div>
        </div>
        <div className="dropdown">
            <button className="dropbtn">Šablons
                <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
                <p>Attiecību fails</p>
                <p>Struktūrvienību fails</p>
                <p>Struktūras fails</p>
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