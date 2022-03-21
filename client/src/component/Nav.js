import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Nav = () => {
  return (
    <div className='nav-bar'>
        <div className="main">
            <Link to="/books">
                <div className="book">
                    BOOKS
                </div>
            </Link>
            <Link to="/authors">
                <div className="author">
                    AUTHORS
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Nav