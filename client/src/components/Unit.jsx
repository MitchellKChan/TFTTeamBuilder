import React from "react";
import UnitIcon from "../shared/UnitIcon/UnitIcon";

function Unit(props) {

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
        <UnitIcon 
            cost={props.unitInfo.cost}
            dragFromUnitPool={dragFromUnitPool}
            teamBuilderDisplay
            name={props.unitInfo.name}
            iconPath={props.iconPath}
            classNames={"unit teambuilder-unit"}
        />
    );
}

export default Unit;