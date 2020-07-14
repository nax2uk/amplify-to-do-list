import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../css/NavBar.css';
const NavBar = ({ user }) => {
    return (
        <nav>
            <div className="logo">
                <Link to="/">TO DO APP</Link>
            </div>
            <div className="menu">
                <div className="items">
                    <div className="greeting">Hello <NavLink to="/profile">{user.username}</NavLink></div>
                    <button to="/">Sign Out</button>
                </div>
            </div>
        </nav >
    );
};
export default NavBar;