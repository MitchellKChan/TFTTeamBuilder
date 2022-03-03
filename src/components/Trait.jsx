import React from "react";

function Trait(props) {
    return (
        <div className="trait">
            <p>{props.name}</p>
            {/* <img src={props.iconPath} draggable="false" alt={props.name} data-toggle="tooltip" title={props.name}></img> */}
        </div>
    );
}

export default Trait;