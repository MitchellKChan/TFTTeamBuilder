import React from "react";
import Unit from "./Unit"
import units from "../set5patch1115/champions.json";
import iconPath from "../iconPaths";

function Units() {

    // require.context call to generate a context module of unit icon paths;
    // iconMapper function call to save object of unit icon path mappings to unitIcons
    const unitIcons = iconPath("unit");

    return (
        <div className="">
            {units.map(unit => {
                return (
                    <Unit 
                        key={unit.championId}
                        id={unit.championId}
                        name={unit.name} 
                        cost={unit.cost} 
                        iconPath={unitIcons[unit.championId]}
                        traits={unit.traits}
                    />
                );
            })}
        </div>
    );
}

export default Units;