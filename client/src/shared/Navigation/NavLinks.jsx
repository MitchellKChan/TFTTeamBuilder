import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/authContext";

function NavLinks(props) {
    const auth = useContext(AuthContext);
    
    return (
        <ul className={props.listClasses}>
            <li className={props.itemClasses}>
                <NavLink className={props.navLinkClasses} to="/teambuilder">Team Builder</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li className={props.itemClasses}>
                    <NavLink className={props.navLinkClasses} to={`/teamcomps/${auth.username}`}>My Team Comps</NavLink>
                </li>
            )}
            <li className={props.itemClasses}>
                <NavLink className={props.navLinkClasses} to="/teamcomps">All Team Comps</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li className={props.itemClasses}>
                    <NavLink className={props.navLinkClasses} to="/users">All Users</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li className={props.itemClasses}>
                    <NavLink className={props.navLinkClasses} to="/auth">Login/Signup</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li className={props.itemClasses}>
                    <NavLink className={props.navLinkClasses} to="/" onClick={auth.logout}>Log Out</NavLink>
                </li>
            )}
        </ul>
    );
}

export default NavLinks;