import React from "react";

function Trait(props) {

    let traitLevel = 0
    let nextBreakpoint = props.traitInfo.sets[traitLevel];
    while (props.count >= nextBreakpoint.max) {
        nextBreakpoint = props.traitInfo.sets[traitLevel++];
    }
    return (
        <div className={"trait p-2 my-3 " + props.traitStyle}>
            <div className="d-inline-block align-middle px-1">
                <img src={props.iconPath} draggable="false" alt={props.name} data-toggle="tooltip" title={props.name}></img>
            </div>
            <div className="d-inline-block align-middle px-1">
                <span>{props.traitInfo.name}</span>
                <div>{props.count} / {nextBreakpoint.min}</div>
            </div>
        </div>
    );
}

export default Trait;