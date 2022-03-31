import React from "react";
import Trait from "./Trait";
import traits from "../set5patch1115/traits.json";
import iconPath from "../iconPaths";

function Traits(props) {

    // iconPath call with parameter "trait" to save the object of Trait icon paths to traitIcons
    const traitIcons = iconPath("trait");

    return (Object.keys(props.activeTraits).length === 0 ? <div>Please add units to the board to view active traits</div> : 
        <div className="">
            {Object.entries(props.activeTraits).map(([trait, count]) => {
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