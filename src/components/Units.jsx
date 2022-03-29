import React from "react";
import Unit from "./Unit"
import units from "../set5patch1115/champions.json";
import iconPath from "../iconPaths";

function Units(props) {

    // require.context call to generate a context module of unit icon paths;
    // iconMapper function call to save object of unit icon path mappings to unitIcons
    const unitIcons = iconPath("unit");

    // create new array excluding Target Dummy unit (championId "TFT_TrainingDummy")
    const championUnits = units.filter((unit) => {
        return unit.championId !== "TFT_TrainingDummy";
    });

    function handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.getData("dragOrigin") === "BoardHex") {
            props.appHandleDrop(event.dataTransfer.getData("dragOrigin"), -1);
        }
        event.target.classList.remove("units-drag-over");
    }

    function handleDragEnter(event) { // TODO: need to refactor "hex-drag-over" styling to trigger only when props.heldObj is a BoardHex Component
        event.preventDefault();
        event.stopPropagation();
        if (props.heldObj.hasUnit) {
            event.target.classList.add("units-drag-over");
        }
    }
    function handleDragLeave(event) { // TODO: need to refactor "hex-drag-over" styling removal to trigger only when props.heldObj is a BoardHex Component
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove("units-drag-over");
    }

    return (
        <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver} 
            onDragEnter={handleDragEnter} 
            onDragLeave={handleDragLeave}
        >
            {championUnits.map(unit => {
                return (
                    <Unit 
                        key={unit.championId}
                        iconPath={unitIcons[unit.championId]}
                        unitInfo={unit}
                        appHandleDrop={props.appHandleDrop}
                        appHandleDrag={props.appHandleDrag}
                    />
                );
            })}
        </div>
    );
}

export default Units;