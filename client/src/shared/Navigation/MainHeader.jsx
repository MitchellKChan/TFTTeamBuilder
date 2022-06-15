import React from "react";

function MainHeader(props) {
    return <header className={`navbar navbar-expand-lg ${props.classNames}`}>{props.children}</header>
}

export default MainHeader;