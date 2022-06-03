import React from "react";

function MainHeader(props) {
    return <header className="navbar navbar-expand-lg bg-light mb-3">{props.children}</header>
}

export default MainHeader;