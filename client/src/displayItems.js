import items from "./set5patch1115/items.json";

// displayItems is called in Items.jsx and is passed a string for how to group Item Components
// displayItems returns an array of objects grouping Item information from items.json (imported in as "items")

function displayItems(grouping) {
    // Parameter:
    //      - "grouping": the props.showItemsBy property string passed in from Itemx.jsx, which is one of the following:
    //              -- "Tome Emblems": "items" should be filtered for objects where the "isElusive" property is true
    //              -- "Radiant": "items" should be filtered for objects where the "isRadiant" property is true
    //              -- "Craftable": "items" should be filtered for objects where:
    //                      --- the "isElusive" property is false (exclude items only available through Tome of Traits)
    //                      --- the "isRadiant" property is false (exlcude Radiant items)
    //                      --- the id is greater than 9 (exclude component items)
    // Return value is a filtered array of "items" imported from items.json depending on the value of "grouping"

    switch (grouping) {
        case "Emblems": // "Tome Emblems" passed when the Tome Emblems button is selected in App.jsx
            return items.filter((item) => {
                return item.isElusive;
            });
        case "Radiant": // "Radiant" passed when the Radiant button is selected in App.jsx
            return items.filter((item) => {
                return item.isRadiant;
            });
        default: // "Craftable" passed by default as the Craftable button is selected in App.jsx when the app loads initially
            return items.filter((item) => {
                return !item.isRadiant && !item.isElusive && item.id > 9;
            });
    }

}

export default displayItems;