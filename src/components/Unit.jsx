import React from "react";

function Unit(props) {

    const costBorder = ("cost-" + props.unitInfo.cost.toString());

    function drag(event) {
        event.dataTransfer.setData("dragOrigin", "unit pool");

        const dragObject = {
            unitId: props.unitInfo.championId,
            unitName: props.unitInfo.name,
            unitCost: props.unitInfo.cost,
            unitIcon: props.iconPath,
            unitTraits: props.unitInfo.traits,
        }

        props.appHandleDrag("unit pool", dragObject);
    }
    return (
        <div className="d-inline-block mr-md-1 mb-md-1">
            <div className={"unit " + costBorder} draggable="true" onDragStart={drag}>
                {/* <p>{props.name}</p> */}
                <img src={props.iconPath} alt={props.unitInfo.name} ></img>
                <div className="unit-name">{props.unitInfo.name}</div>
                {/* <p>{props.cost}</p> */}
            </div>
        </div>
    );
}

export default Unit;