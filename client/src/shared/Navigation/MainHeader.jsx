import React from "react";

function MainHeader(props) {
    return <header className="navbar navbar-expand-lg bg-secondary">{props.children}</header>
}

export default MainHeader;