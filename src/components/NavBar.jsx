import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../css/NavBar.css';
const NavBar = ({ handleSignOut }) => {
    return (

        <nav class="navbar navbar-expand-xxl navbar-light bg-light">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <Link class="navbar-brand" to="/"><img src="/images/favicons/android-chrome-512x512.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy" />&nbsp;To Do App</Link>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <NavLink to="/">Home </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/profile">My Profile</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/profile" onClick={handleSignOut}>Sign Out</NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    );
};
export default NavBar;