import traits from "../../set5patch1115/traits.json";
import iconPath from "../../iconPaths";

// iconPath call with parameter "trait" to save the object of Trait icon paths to traitIcons
const traitIconsSvg = iconPath("trait_svg"); 

// levelHierarchy contains the possible active trait level values in ascending order from lowest to highest level
// levelHierarchy is used by compareTraitLevels to determine which level an active trait has
const levelHierarchy = ["inactive", "bronze", "silver", "gold", "chromatic"];

// sortTraits is the sorting function used by the Traits and TeamCompTraitsList components
// sortTraits returns a sorted array of trait objects to be displayed in a particular order
function sortTraits(activeTraits) {
    return Object.entries(activeTraits).sort(sortTraitsCallback);
}

// sortTraitsCallback is the sorting callback function used by sortTraits
// sortTraitsCallback prioritizes trait level first, and then alphabetical order of trait name if trait level is the same
function sortTraitsCallback(trait1, trait2) {
    // Parameters:
    //      - trait1, trait2: key-attribute pair arrays passed from Object.entries(props.activeTraits) when sorting by callback function sortTraitsCallback
    //          -- index [0]: key value of an active trait
    //          -- index [1]: number of unique units with the trait in index [0]
    // Return value:
    //      - "traitOrder": the comparison value of trait1 and trait2 when passed to compareTraitLevels, which can be one of the following:
    //          -- {1}: trait1 should be sorted lower than trait2
    //          -- {-1}: trait1 should be sorted higher than trait2
    //          -- {0}: trait1 and trait2 have the same trait level, so they should be sorted alphabetically with localeCompare
    let traitOrder = compareTraitLevels(trait1, trait2);

    return traitOrder !== 0 ? traitOrder : trait1[0].localeCompare(trait2[0]);
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

    // find call on traits array to locate the infomation object whose key matches "trait"
    const traitInfo = traits.find(traitObj => traitObj.key === trait);

    let activeLevelIndex = 0;
    let activeLevel = traitInfo.sets[activeLevelIndex];

    // check if unitCount is less than activeLevel.min (if there are not enough units on board to reach the first active trait level)
    //      - if so, return "inactive"
    if (unitCount < activeLevel.min) {
        return "inactive";
    } else {
    //      - if not, compare unitCount to activeLevel.max to determine which active level the trait has; TODO: need to account for emblem equipment corner casing
        while (unitCount > activeLevel.max && activeLevelIndex <= traitInfo.sets.length) {
            // set activeLevel to the next object in traitInfo.sets by incrementing activeLevelIndex
            activeLevel = traitInfo.sets[activeLevelIndex++];
        }
        return activeLevel.style;
    }
}

// compareTraitLevel compares the style values for the active levels of traits and is called by sortTraitsCallback
// compareTraitLevel returns the comparison value of the parameter traits
function compareTraitLevels(trait1, trait2) {
    // Parameters:
    //      - trait1, trait2: key-attribute pair arrays passed from Object.entries(props.activeTraits) when sorting by callback function sortTraitsCallback
    //          -- index [0]: key value of an active trait
    //          -- index [1]: number of unique units with the trait in index [0]
    // compareTraitLevel returns one of the following values based on its respective situation:
    //      - {1}: trait1 should be sorted lower than trait2
    //      - {-1}: trait1 should be sorted higher than trait2
    //      - {0}: trait1 and trait2 have the same trait level

    // call getTraitLevel for trait1 and trait2 to save their respective style values
    const traitLevel1 = getTraitLevel(trait1[0], trait1[1]);
    const traitLevel2 = getTraitLevel(trait2[0], trait2[1]);

    // compare the indices of the trait levels based on their position within levelHierarchy
    const levelDifference = levelHierarchy.indexOf(traitLevel1) - levelHierarchy.indexOf(traitLevel2);
    
    // if traitLevel1's index in levelHierarchy is higher than traitLevel2's index (levelDifference > 0), return -1
    if (levelDifference > 0) {
        return -1;
    }
    // if traitLevel1's index in levelHierarchy is lower than traitLevel2's index (levelDifference < 0), return 1
    if (levelDifference < 0) {
        return 1;
    }
    return 0;
}    

export { sortTraits, getTraitLevel, traits, traitIconsSvg };