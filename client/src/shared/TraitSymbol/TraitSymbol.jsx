import React from "react";

import "./TraitSymbol.css";

function TraitSymbol(props) {

    const iconClasses = props.teamCompDisplay ? "teamcomp-trait-level" : "teambuilder-trait-level";
    
    return (
        <div className={props.classNames}>
            <div className={iconClasses} style={{ backgroundImage: `url(${props.traitLevel})` }}> 
                <img src={props.iconPath} draggable="false" alt={props.traitInfo.name} data-toggle="tooltip" title={props.traitInfo.name}></img>
            </div>
        </div>
    );
}

export default TraitSymbol;