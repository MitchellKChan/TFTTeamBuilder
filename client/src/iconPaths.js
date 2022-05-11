import iconMapper from "./iconMapper";

// require.context call to generate a context module of icon paths for the parameter directories;
// iconMapper function call to save object of icon path mappings to the following constants:
const _ITEMICONS = iconMapper(require.context("./set5patch1115/items", false, /\.png$/), ".png");
const _UNITICONS = iconMapper(require.context("./set5patch1115/champions", false, /\.png$/), ".png");
const _TRAITICONS = iconMapper(require.context("./set5patch1115/traits", false, /\.png$/), ".png");
const _TRAITICONSSVG = iconMapper(require.context("./set5patch1115/traits", false, /\.svg$/), ".svg");

function iconPath(iconType) {
    // Parameter:
    //      - "iconType": the string indicating which icon filepath mapping constant should be returned
    // Return value is an object of filepaths based on the value of "iconType" that is passed

    switch(iconType) { 
        case "unit": // "unit" passed when called in Units.jsx
            return _UNITICONS;
        case "item": // "item" passed when called in Items.jsx
            return _ITEMICONS;
        case "trait": // "trait" passed when called in Traits.jsx
            return _TRAITICONS;
        case "trait_svg": // "trait" passed when called in Traits.jsx
            return _TRAITICONSSVG;
        default:
            console.log("Please call the iconPath function with \"unit\", \"item\", or \"trait\" to return icon paths.");
            return null;
    }
}
 export default iconPath;