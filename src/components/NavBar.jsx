import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../context/user/userContext';
import '../css/NavBar.css';
const NavBar = () => {

    const { signOut } = useContext(UserContext);
    return (

        <nav className="navbar navbar-expand-xxl navbar-light bg-light">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/"><img src="/images/favicons/android-chrome-512x512.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />&nbsp;To Do App</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink to="/">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/profile">My Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/profile" onClick={signOut}>Sign Out</NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    );
};
export default NavBar;