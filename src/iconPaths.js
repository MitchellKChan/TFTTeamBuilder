import iconMapper from "./iconMapper";

// require.context call to generate a context module of icon paths;
// iconMapper function call to save object of icon path mappings to the following variables:
const _ITEMICONS = iconMapper(require.context("./set5patch1115/items", false, /\.png$/));
const _UNITICONS = iconMapper(require.context("./set5patch1115/champions", false, /\.png$/));
const _TRAITICONS = iconMapper(require.context("./set5patch1115/traits", false, /\.png$/));

// iconPath returns one of three objects based on what the parameter value is:
//      - parameter: "iconType" is a string that is passed to iconPath from either Units.jsx, Items.jsx, or Traits.jsx
// iconPath returns the object of filepaths based on the value of "iconType" that is passed:
//      - "unit" when called in Units.jsx -> _UNITICONS
//      - "item" when called in Items.jsx -> _ITEMICONS
//      - "trait" when called in Traits.jsx -> _TRAITICONS
function iconPath(iconType) {
    switch(iconType) {
        case "unit":
            return _UNITICONS;
        case "item":
            return _ITEMICONS;
        case "trait":
            return _TRAITICONS;
        default:
            console.log("Please call the iconPath function with \"unit\", \"item\", or \"trait\" to return icon paths.");
            return null;
    }
}
 export default iconPath;