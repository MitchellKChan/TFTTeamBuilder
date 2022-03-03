import React from "react";
import Item from "./Item";
import items from "../set5patch1115/items.json";
import iconPath from "../iconPaths";

function Items() {

    // create new array excluding component items (ids 1-9)
    const completedItems = items.filter((item) => {
        return item.id > 9;
    });

    // require.context call to generate a context module of item icon paths;
    // iconMapper function call to save object of item icon path mappings to itemIcons
    const itemIcons = iconPath("item");

    return (
        <div className="">
            {completedItems.map(item => {
                return (
                    <Item 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        iconPath={itemIcons[item.id]}
                    />
                );
            })}
        </div>
    );
}

export default Items;