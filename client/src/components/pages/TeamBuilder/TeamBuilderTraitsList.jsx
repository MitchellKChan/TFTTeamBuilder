import React from "react";
import Trait from "./TeamBuilderTrait";
import Card from "../../../shared/UIElements/Card";
import { sortTraits, getTraitLevel, traits, traitIconsSvg } from "../../../shared/util/traitTools";

function Traits(props) {

    // orderedTraits is an array of active traits ordered by the following:
    //      - highest active level to lowest active level;
    //      - if active trait levels are the same, order by alphabetical order of trait name
    const orderedTraits = sortTraits(props.activeTraits);

    return (
        <React.Fragment>
            {Object.keys(props.activeTraits).length === 0 ? 
                <Card className="message">Please add units to the board to view active traits</Card> : 
                <div>
                    {orderedTraits.map(([trait, count]) => {
                        const activeTrait = traits.find(traitInfo => traitInfo.key === trait);
                        return (
                            <Trait 
                                key={activeTrait.key}
                                traitInfo={activeTrait}
                                count={count}
                                iconPath={traitIconsSvg[activeTrait.name.toLowerCase()]}
                                traitLevel={traitIconsSvg[getTraitLevel(trait, count)]}
                                classNames={props.classNames}
                            />
                        );
                    })}
                </div>}
        </React.Fragment>
    );
}

export default Traits;