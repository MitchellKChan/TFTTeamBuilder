import React from "react";
import Item from "./Item";
import items from "../set5patch1115/items.json";
import iconPath from "../iconPaths";

function Items(props) {

    // require.context call to generate a context module of item icon paths;
    // iconMapper function call to save object of item icon path mappings to itemIcons
    const itemIcons = iconPath("item");

    // create new array excluding component items (ids 1-9)
    const completedItems = items.filter((item) => {
        return item.id > 9;
    });

    function handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.getData("dragOrigin") === "Item") {
            props.appHandleDrop(event.dataTransfer.getData("dragOrigin"), -1);
        }
        event.target.classList.remove("items-drag-over");
    }

    function handleDragEnter(event) { // TODO: may need to refactor "items-drag-over" styling to trigger only when props.heldObj is an Item Component
        event.preventDefault();
        event.stopPropagation();
        if (props.heldObj.prevHexId) {
            event.target.classList.add("items-drag-over");
        }
    }
    function handleDragLeave(event) { // TODO: may need to refactor "items-drag-over" styling removal to trigger only when props.heldObj is an Item Component
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove("items-drag-over");
    }

    return (
        <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver} 
            onDragEnter={handleDragEnter} 
            onDragLeave={handleDragLeave}
        >
            {completedItems.map(item => {
                return (
                    <Item 
                        key={item.id}
                        iconPath={itemIcons[item.id]}
                        itemInfo={item}
                        displayClasses={"d-inline-block mr-md-1 mb-md-1 items-item"}
                        appHandleDrop={props.appHandleDrop}
                        appHandleDrag={props.appHandleDrag}
                    />
                );
            })}
        </div>
    );
}

export default Items;