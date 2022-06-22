import React from "react";

import "./UnitIcon.css";

function UnitIcon(props) {

    // costBorder is the className string that determines the border of the Unit based on its cost
    const costBorder = (props.classNames + " cost-" + props.cost.toString());

    return (
        <div className={"icon-wrapper " + props.marginClasses}>
            <div 
                className={costBorder} 
                draggable={props.teamBuilderDisplay} 
                onDragStart={props.dragFromUnitPool}
            >
                <img src={props.iconPath} alt={props.name} ></img>
                {props.teamBuilderDisplay && <div className="unit-name">{props.name}</div>}
            </div>
        </div>

    );
}

export default UnitIcon;