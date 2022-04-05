import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './NavBar.css'

import runAlgorithm from '../../algorithm'

function NavBar() {
  const dispatch = useDispatch()
  const [relations, nodes, requiredStructure] =
      useSelector((state) => [state.relations, state.nodes, state.requiredStructure])
  const doRunAlgorithm = useMemo(() => {
      return runAlgorithm.bind(null, dispatch, relations, nodes, requiredStructure)
  }, [dispatch, relations, nodes, requiredStructure])

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
          <button onClick={doRunAlgorithm}>Izpildīt algoritmu</button>
      </div>
    </div>
  )
}

export default NavBar