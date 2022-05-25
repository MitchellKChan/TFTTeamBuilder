import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

function MainNavigation() {
    return (
        <MainHeader>
            <div className="container-fluid">
                <div className="navbar-brand">
                    <Link to="/" >TFT Team Builder - Set 5.5</Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <NavLinks listClasses={"navbar-nav me-auto mb-2 mb-lg-0"} itemClasses={"nav-item"}/>
                </div>
                {/* <button>
                    <span />
                    <span />
                    <span />
                </button> */}
            </div>
        </MainHeader>
    );
}

export default MainNavigation;