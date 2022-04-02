import React from "react";
import Trait from "./Trait";
import traits from "../set5patch1115/traits.json";
import iconPath from "../iconPaths";

function Traits(props) {

    // iconPath call with parameter "trait" to save the object of Trait icon paths to traitIcons
    const traitIcons = iconPath("trait");
    
    // orderedTraits is an array of active traits ordered from highest active level to lowest (endstate)
    // 
    // Parameters:
    //      - "trait1": the trait after trait2 index-wise in props.activeTraits
    //      - "trait2": the trait before trait1 index-wise in props.activeTraits
    const orderedTraits = Object.entries(props.activeTraits).sort(sortTraits);

    // sortTraits is the sorting function used to create orderedTraits
    //      - sortTraits prioritizes trait level first and then alphabetical order of trait name if trait level is the same
    function sortTraits(trait1, trait2) {
        if (compareTraitLevels(trait1, trait2) === 0) {
            return trait1[0].localeCompare(trait2[0]); // sort in ascending order; -1 means trait1 comes before trait2 and 1 means the opposite 
        } else {
            return compareTraitLevels(trait1, trait2);
        }
    }

    // getTraitLevel is called when props.activeTraits is sorted from highest active level to lowest (endstate)
    // getTraitLevel returns the "style" value for the active level of the trait
    function getTraitLevel(trait, unitCount) {
        // Parameter:
        //      - "trait": key string of a trait from props.activeTraits
        //      - "unitCount": number of unique units on the board with the "trait" trait
        // Return value is a string with one of the following values:
        //      - "inactive"
        //      - "bronze"
        //      - "silver"
        //      - "gold"
        //      - "chromatic"
        const traitInfo = traits.find(traitInfo => traitInfo.key === trait);

        let activeLevelIndex = 0;
        let activeLevel = traitInfo.sets[activeLevelIndex];

        // check if unitCount is less than activeLevel.min (if there are not enough units on board to reach the first active trait level)
        //      - if so, return "inactive"
        if (unitCount < activeLevel.min) {
            return "inactive";
        } else {
        //      - if not, compare unitCount to activeLevel.max to determine which active level the trait has; TODO: need to account for emblem equipment corner casing
            while (unitCount >= activeLevel.max && activeLevelIndex <= traitInfo.sets.length) {
                // set activeLevel to the next object in traitInfo.sets by incrementing activeLevelIndex
                activeLevel = traitInfo.sets[activeLevelIndex++];
            }
            return activeLevel.style;
        }
    }

    // compareTraitLevel compares which trait level is higher and is called by sortTraits
    // compareTraitLevel returns one of the following values based on its respective situation:
    //      - {1}: traitLevel1 is higher than traitLevel2
    //      - {-1}: traitLevel1 is lower than traitLevel2
    //      - {0}: traitLevel1 is equal to traitLevel2
    function compareTraitLevels(trait1, trait2) {

        // levelHierarchy contains the possible level values in ascending order from lowest to highest level
        const levelHierarchy = ["inactive", "bronze", "silver", "gold", "chromatic"];

        // compare the indices of the trait levels based on their position within levelHierarchy \
        const traitLevel1 = getTraitLevel(trait1[0], trait1[1]);
        const traitLevel2 = getTraitLevel(trait2[0], trait2[1]);
        const comparison = levelHierarchy.indexOf(traitLevel1) - levelHierarchy.indexOf(traitLevel2);
        if (comparison > 0) {
            return -1;
        } else if (comparison < 0) {
            return 1;
        } else {
            return 0;
        }
    }
    

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