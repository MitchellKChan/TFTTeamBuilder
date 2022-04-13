import units from "./set5patch1115/champions.json";
import traits from "./set5patch1115/traits.json";

// unitOrganizer handles how Unit Components are shown in the Units Component when switching between different filters:
//      - "Name": default filter; show units in alphabetical order by name
//      - "Cost": show units from lowest to highest cost and then in alphabetical order by name
//      - "Origin": show units grouped by Origin (not implemented yet)
//      - "Class": show units groups by Class (not implemented yet)
// unitOrganizer returns an array of objects that is used by Units.jsx to show Unit Components in various ways
function unitOrganizer(grouping) {
    // create new array excluding Target Dummy unit (championId "TFT_TrainingDummy")
    const championUnits = units.filter((unit) => {
        return unit.championId != "TFT_TrainingDummy";
    });

    switch (grouping) {
        case ("Cost"): // "Cost" passed when the Cost button is selected in App.jsx
            let displayedUnits = championUnits.sort((champion1, champion2) => {
                if (champion1.cost > champion2.cost) {
                    return 1;
                }
                if (champion1.cost < champion2.cost) {
                    return -1;
                }
                return champion1.name.localeCompare(champion2.name);
            });
            return displayedUnits;
            
        case ("Origin"): // "Origin" passed when the Origin button is selected in App.jsx
            return groupUnitsBy("origin", championUnits);

        case ("Class"): // "Class" passed when the Class button is selected in App.jsx
            return groupUnitsBy("class", championUnits);

        default: // "Name" passed by default as the Name button is selected in App.jsx by default when the app loads initially
            return championUnits;
    }
}

// groupUnitsBy is called in unitOrganizer and is passed a string for how to group Unit Components
// groupUnitsBy returns an array of objects grouping Unit information from champions.json
function groupUnitsBy(groupBy, championUnits) {
    let unitGroups = traits.filter((trait) => {
        return trait.type === groupBy;
    });

    unitGroups.forEach((group, index) => {
        unitGroups[index] = {
            ...group,
            units: championUnits.filter((unit) => {
                return unit.traits.indexOf(group.key) != -1;
            })
        };
    });

    return unitGroups;

}

export default unitOrganizer;