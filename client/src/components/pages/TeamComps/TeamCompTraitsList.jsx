import React from "react";
import TraitSymbol from "../../../shared/TraitSymbol/TraitSymbol";
import { sortTraits, getTraitLevel, traits, traitIconsSvg } from "../../../shared/util/traitTools";

function TeamCompTraitsList(props) {

    // orderedTraits is an array of active traits ordered by the following:
    //      - highest active level to lowest active level;
    //      - if active trait levels are the same, order by alphabetical order of trait name
    const orderedTraits = sortTraits(props.activeTraits);

    return (
        <React.Fragment>
            {orderedTraits.map(([trait, count]) => {
                const activeTrait = traits.find(traitInfo => traitInfo.key === trait);
                const traitLevel = getTraitLevel(trait, count);
                if (traitLevel !== "inactive") {
                    return (
                        <TraitSymbol 
                            key={activeTrait.key}
                            traitInfo={activeTrait}
                            iconPath={traitIconsSvg[activeTrait.name.toLowerCase()]}
                            traitLevel={traitIconsSvg[traitLevel]}
                            classNames={props.classNames}
                            teamCompDisplay={props.teamCompDisplay}
                        />
                    );
                }
            })}
        </React.Fragment>
    );
}

export default TeamCompTraitsList;