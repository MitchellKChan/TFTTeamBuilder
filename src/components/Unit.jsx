import React from "react";

function Unit(props) {

    function drag(event) {
        event.dataTransfer.setData("unitId", props.id);
        event.dataTransfer.setData("unitName", props.name);
        event.dataTransfer.setData("unitCost", props.cost);
        event.dataTransfer.setData("unitIconPath", props.iconPath);
        event.dataTransfer.setData("unitTraits", props.traits);
    }
    return (
        <div className="d-inline-block mr-md-1 mb-md-1">
            <div className="unit" draggable="true" onDragStart={drag}>
                {/* <p>{props.name}</p> */}
                <img src={props.iconPath} alt={props.name} ></img>
                {/* <p>{props.cost}</p> */}
            </div>
        </div>
    );
}

export default Unit;