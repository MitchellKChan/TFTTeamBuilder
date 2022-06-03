import React, { useState } from "react";
import Unit from "./Unit"
import iconPath from "../iconPaths";
import unitOrganizer from "../unitOrganizer";

function Units(props) {

    // useState object to manage Units background styling when a unit from the Board Component is being dragged
    const [unitsBackground, updateUnitsBackground] = useState(false);

    // iconPath call with parameter "unit" to save the object of Unit icon paths to unitIcons
    const unitIcons = iconPath("unit");

    // create new array excluding Target Dummy unit (championId "TFT_TrainingDummy")
    let championUnits = unitOrganizer(props.showUnitsBy);

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
            className={"units " + (unitsBackground ? "units-drag-over" : "")}
            onDrop={handleDrop}
            onDragOver={handleDragOver} 
            onDragEnter={handleDragEnter} 
            onDragLeave={handleDragLeave}
        >
            {props.showUnitsBy === "Name" || props.showUnitsBy === "Cost" ? 
                championUnits.map(unit => {
                    return (
                        <Unit 
                            key={unit.championId}
                            iconPath={unitIcons[unit.championId]}
                            unitInfo={unit}
                            appHandleDrop={props.appHandleDrop}
                            appHandleDrag={props.appHandleDrag}
                        />
                    );
                }) : 
                championUnits.map(grouping => {
                    return (
                        <div key={grouping.name}>
                            <div className="mb-1 unit-group">{grouping.name} ({grouping.units.length})</div>
                                {grouping.units.map(unit => {
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
                })
            }
        </div>
    );
}

export default Units;