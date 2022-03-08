// iconMapper is called in iconPaths.js and is passed the return value of require.context 
// (context module of icon paths) for the following directories of icons:
//      - "./set5patch1115/champions"
//      - "./set5patch1115/items"
//      - "./set5patch1115/traits"
// The returned icon path objects are saved to constants in iconPaths.js that components use for displaying icons

function iconMapper(contMod) {
    // Parameter:
    //      - "contMod": the context module passed in from iconPaths.js
    // Return value "icons" is an object of key-value object pairs as described:
    //      - key: id value of objects from the object type's corresponding JSON array
    //      - value: file path to icon of object id for different object types (Units, Items, Traits)
    
    let icons = {};

    contMod.keys().forEach((obj) => {
        // remove "./" prefix and ".png" suffix from item so that typeId string only contains 
        // the specific object id value
        const typeId = obj.replace("./", "").replace(".png", "");
        // object id value typeId key is mapped to its respective icon path from contMod
        icons[typeId] = contMod(obj);
    });

    return icons;
}

export default iconMapper;