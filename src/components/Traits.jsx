import React from "react";
import Trait from "./Trait";
import traits from "../set5patch1115/traits.json";
import iconMapper from "../iconMapper";
import iconPath from "../iconPaths";

function Traits() {

    // require.context call to generate a context module of trait icon paths;
    // iconMapper function call to save object of trait icon path mappings to traitIcons
    const traitIcons = iconPath("trait");

    return (
        <div className="">
            {traits.map(trait => {
                return (
                    <Trait 
                        key={trait.key}
                        id={trait.key}
                        name={trait.name}
                        description={trait.description}
                        iconPath={traitIcons[trait.name.toLowerCase()]}
                    />
                );
            })}
        </div>
    );
}

export default Traits;