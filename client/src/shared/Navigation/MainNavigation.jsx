import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

function MainNavigation() {
    return (
        <MainHeader classNames="main-header">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <Link className="text-light" to="/" >TFT Team Builder - Set 5.5</Link>
                </div>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarTabs" 
                    aria-controls="navbarTabs" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTabs">
                    <NavLinks listClasses={"navbar-nav me-auto mb-2 mb-lg-0"} itemClasses={"nav-item"} navLinkClasses={"nav-link text-light"}/>
                </div>
            </div>
        </MainHeader>
    );
}

export default MainNavigation;