import React from "react";
import Trait from "./Trait";
import traits from "../set5patch1115/traits.json";
import iconPath from "../iconPaths";

function Traits(props) {

    // iconPath call with parameter "trait" to save the object of Trait icon paths to traitIcons
    const traitIcons = iconPath("trait");
    
    // orderedTraits is an array of active traits ordered from highest active level to lowest
    const orderedTraits = Object.entries(props.activeTraits).sort((trait1, trait2) => {
        return trait1[0].localeCompare(trait2[0]);
    });

    return (Object.keys(props.activeTraits).length === 0 ? <div>Please add units to the board to view active traits</div> : 
        <div className="">
            {orderedTraits.map(([trait, count]) => {
                const activeTrait = traits.find(traitInfo => traitInfo.key === trait);
                return (
                    <Trait 
                        key={activeTrait.key}
                        traitInfo={activeTrait}
                        count={count}
                        iconPath={traitIcons[activeTrait.name.toLowerCase()]}
                    />
                );
            })}
        </div>
    );
}

export default Traits;