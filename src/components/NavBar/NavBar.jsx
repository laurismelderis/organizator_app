import './NavBar.css'
import React from 'react'

function NavBar() {
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
    </div>
  )
}

export default NavBar