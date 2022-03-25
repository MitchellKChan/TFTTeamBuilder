import React from "react";

function Unit(props) {

    // costBorder is the className string that determines the border of the Unit based on its cost
    const costBorder = ("cost-" + props.unitInfo.cost.toString());

    function dragFromUnitPool(event) {
        event.dataTransfer.setData("dragOrigin", "Unit");

        const dragObject = {
            unitId: props.unitInfo.championId,
            unitName: props.unitInfo.name,
            unitCost: props.unitInfo.cost,
            unitIcon: props.iconPath,
            unitTraits: props.unitInfo.traits,
        };

        // props.appHandleDrag updates the "heldObj" object of appState in App.jsx with dragObject;
        // "Unit" parameter informs App.jsx that "heldObj" is being dragged from the Units component
        props.appHandleDrag("Unit", dragObject);
    }
    return (
        <div className="d-inline-block mr-md-1 mb-md-1">
            <div className={"unit " + costBorder} draggable="true" onDragStart={dragFromUnitPool}>
                <img src={props.iconPath} alt={props.unitInfo.name} ></img>
                <div className="unit-name">{props.unitInfo.name}</div>
            </div>
        </div>
    );
}

export default Unit;