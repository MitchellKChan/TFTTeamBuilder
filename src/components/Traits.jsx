import React from "react";
import Trait from "./Trait";
import traits from "../set5patch1115/traits.json";
import iconPath from "../iconPaths";

function Traits(props) {

    // require.context call to generate a context module of trait icon paths;
    // iconMapper function call to save object of trait icon path mappings to traitIcons
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