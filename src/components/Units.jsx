import React from "react";
import Unit from "./Unit"
import units from "../set5patch1115/champions.json";
import iconPath from "../iconPaths";

function Units(props) {

    // require.context call to generate a context module of unit icon paths;
    // iconMapper function call to save object of unit icon path mappings to unitIcons
    const unitIcons = iconPath("unit");

    return (
        <div className="">
            {units.map(unit => {
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