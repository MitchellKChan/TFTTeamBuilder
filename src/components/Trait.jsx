import React from "react";

function Trait(props) {

    let traitLevel = 0
    let nextBreakpoint = props.traitInfo.sets[traitLevel];
    while (props.count >= nextBreakpoint.max) {
        nextBreakpoint = props.traitInfo.sets[traitLevel++];
    }
    return (
        <div className="trait">
            <p>{props.traitInfo.name}: {props.count} / {nextBreakpoint.min}</p>
            <img src={props.iconPath} draggable="false" alt={props.name} data-toggle="tooltip" title={props.name}></img>
        </div>
    );
}

export default Trait;