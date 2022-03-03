// iconMapper returns an object of icon paths for the context module parameter "contMod".  
// iconMapper is passed the return value of require.context, which is called by the following
// components with their respective directories:
//      - Units.jsx: "../set5patch1115/champions"
//      - Items.jsx: "../set5patch1115/items"
//      - Traits.jsx: "../set5patch1115/traits"

function iconMapper(contMod) { // ** UPDATE DESCRIPTIONS TO REFLECT HOW THIS IS USED IN "iconPaths.js" instead of Components **
    
    // iconMapper builds an object of key-values pairs for mapping icon ids to respective icon paths:
    //      - parameter: "contMod" is the context module passed in from Units.jsx, Items.jsx, and Traits.jsx
    // return value "icons" is an object of key-value object pairs as described:
    //      - key: id value of objects from the object type's corresponding JSON array
    //      - value: file path to icon of object id for objeects
    let icons = {};
    contMod.keys().forEach((obj) => {
        // remove "./" prefix and ".png" suffix from item so that typeId string only contains 
        // the specific object id value
        const typeId = obj.replace("./", "").replace(".png", "");
        icons[typeId] = contMod(obj);
    });

    return icons;
}

export default iconMapper;