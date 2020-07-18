import React, { useContext } from 'react';
//import UserContext from '../context/user/userContext';
import '../css/NavBar.css';
const NavBar = () => {

    //const { signOut } = useContext(UserContext);
    return (

        <nav className="navbar navbar-expand-xxl navbar-light bg-light">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/"><img src="/images/favicons/android-chrome-512x512.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />&nbsp;To Do App</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a href="/">Home </a>
                    </li>
                    <li className="nav-item">
                        <button>Delete Account</button>
                    </li>
                    <li className="nav-item">
                        <a href="/" >Sign Out</a>
                    </li>
                </ul>
            </div>

        </nav>
    );
};
export default NavBar;