import React from 'react'
import netflixLogo from '../../assets/netflix-logo.png'
import avatar from '../../assets/Netflix-avatar.png'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    return (
        <div className='navbar navbar-expand-lg mt-3 mx-5'>
            <div className="logo">
                <img src={netflixLogo} alt="Netflix Logo" />
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse menu-links" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto mb-lg-0">
                    <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">TV Shows</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Movies</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">New & Popular</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">My List</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Browse by Language</a></li>
                </ul>
            </div>

            <div className="menu-right d-none d-md-none d-lg-flex">
                <div className="search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="link">
                    <a className="nav-link" href="#">Children</a>
                </div>
                <div className="notification">
                    <FontAwesomeIcon icon={faBell} />
                </div>
                <div className="avatar">
                    <img src={avatar} alt="Netflix Avatar" className='pe-2' /><FontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>

        </div>
    )
}

export default Navbar