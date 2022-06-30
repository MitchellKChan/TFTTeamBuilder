import React from "react";
import TraitSymbol from "../../../shared/TraitSymbol/TraitSymbol";

function Trait(props) {

    let traitLevel = 0
    let nextBreakpoint = props.traitInfo.sets[traitLevel];
    while (props.count >= nextBreakpoint.max) {
        nextBreakpoint = props.traitInfo.sets[traitLevel++];
    }
    return (
        <div className={"trait"}>
            <TraitSymbol 
                traitLevel={props.traitLevel}
                iconPath={props.iconPath}
                traitInfo={props.traitInfo}
                classNames={props.classNames}
            />
            <div className="d-inline-block align-middle px-1">
                <span>{props.traitInfo.name}</span>
                <div>{props.count} / {nextBreakpoint.min}</div>
            </div>
        </div>
    );
}

export default Trait;