import React from "react";

function Item(props) {

    function drag(event) { // TODO: implement to be able to move items from one hex to another
        event.dataTransfer.setData("dragOrigin", "Item");

        const dragObject = {
            ...props.itemInfo,
            itemIcon: props.iconPath,
            prevHexId: props.equippedHexId // hexId if being dragged from a BoardHex component and not the Items component
        };

        

        // props.appHandleDrag updates the "heldObj" object of appState in App.jsx with dragObject;
        // "Item" parameter informs App.jsx that "heldObj" is being dragged from the Items component
        props.appHandleDrag("Item", dragObject);
    }
    return (
        <div 
            className={props.displayClasses} 
            data-toggle="tooltip" 
            title={props.itemInfo.name} 
            draggable="true"
            onDragStart={drag}
        >
            <img src={props.iconPath} alt={props.itemInfo.name}></img>
        </div>
    );
}

export default Item;