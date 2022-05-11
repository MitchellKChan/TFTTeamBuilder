import React from "react";
import Item from "./Item";
import iconPath from "../iconPaths";
import displayItems from "../displayItems";

function Items(props) {

    // iconPath call with parameter "item" to save the object of Item icon paths to itemIcons
    const itemIcons = iconPath("item");

    let displayedItems = displayItems(props.showItemsBy);

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
            {displayedItems.map(item => {
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