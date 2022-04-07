import React, { useState } from "react";
import Unit from "./Unit"
import units from "../set5patch1115/champions.json";
import iconPath from "../iconPaths";

function Units(props) {

    // useState object to manage Units background styling when a unit from the Board Component is being dragged
    const [unitsBackground, updateUnitsBackground] = useState(false);

    // iconPath call with parameter "unit" to save the object of Unit icon paths to unitIcons
    const unitIcons = iconPath("unit");

    // create new array excluding Target Dummy unit (championId "TFT_TrainingDummy")
    let championUnits = units.filter((unit) => {
        return unit.championId !== "TFT_TrainingDummy";
    });

    // reorder or sort championUnits by props.showUnitsBy; can be one of the following:
    //      - "Name": default value; show units in alphabetical order by name
    //      - "Cost": show units from lowest to highest cost and then in alphabetical order by name
    //      - "Origin": show units grouped by Origin (not implemented yet)
    //      - "Class": show units groups by Class (not implemented yet)
    switch (props.showUnitsBy) {
        case ("Cost"):
            championUnits = championUnits.sort((champion1, champion2) => {
                if (champion1.cost > champion2.cost) {
                    return 1;
                }
                if (champion1.cost < champion2.cost) {
                    return -1;
                }
                return champion1.name.localeCompare(champion2.name);
            });
            break;
        case ("Origin"):
            console.log("Show units grouped by Origin");
            break;
        case ("Class"):
            console.log("Show units grouped by Class");
            break;
        default:
            console.log("Show units ordered by Name");
            break;
    }


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
        updateUnitsBackground(() => {return false;});
    }

    function handleDragEnter(event) { // TODO: need to refactor "hex-drag-over" styling to trigger only when props.heldObj is a BoardHex Component AND while it is being dragged
        event.preventDefault();
        event.stopPropagation();
        if (props.heldObj.hexId) {
            updateUnitsBackground(() => {return true;});
        }
    }
    function handleDragLeave(event) { // TODO: need to refactor "hex-drag-over" styling removal to trigger only when props.heldObj is a BoardHex Component AND when it is being no longer being dragged
        event.preventDefault();
        event.stopPropagation();
        updateUnitsBackground(() => {return false;});
    }

    return (
        <div 
            className={unitsBackground ? "units-drag-over" : ""}
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