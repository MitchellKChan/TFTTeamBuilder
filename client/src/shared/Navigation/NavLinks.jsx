import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/authContext";

function NavLinks(props) {
    const auth = useContext(AuthContext);
    
    return (
        <ul className={props.listClasses}>
            <li className={props.itemClasses}>
                <NavLink className="nav-link" to="/teamcomps">All Team Comps</NavLink>
            </li>
            <li className={props.itemClasses}>
                <NavLink className="nav-link" to="/users">All Users</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li className={props.itemClasses}>
                    <NavLink className="nav-link" to="/u1/teamcomps">My Team Comps</NavLink>
                </li>
            )}
            <li className={props.itemClasses}>
                <NavLink className="nav-link" to="/teambuilder">Team Builder</NavLink>
            </li>
            {!auth.isLoggedIn && (
                <li className={props.itemClasses}>
                    <NavLink className="nav-link" to="/auth">Login/Signup</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li className={props.itemClasses}>
                    <button onClick={auth.logout}>Logout</button>
                </li>
            )}
        </ul>
    );
}

export default NavLinks;