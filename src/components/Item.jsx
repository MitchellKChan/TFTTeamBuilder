import React from "react";

function Item(props) {

    function drag(event) { // TODO: implement to be able to equip items to hexes that have units
        event.dataTransfer.setData("dragOrigin", "Item");
        // props.appHandleDrag("Item", props.itemInfo);

        const dragObject = {
            ...props.itemInfo,
            itemIcon: props.iconPath
        };

        // props.appHandleDrag updates the "heldObj" object of appState in App.jsx with dragObject;
        // "Item" parameter informs App.jsx that "heldObj" is being dragged from the Items component
        props.appHandleDrag("Item", dragObject);
    }
    return (
        <div className="d-inline-block mr-md-1 mb-md-1">
            <div 
                className="item" 
                data-toggle="tooltip" 
                title={props.itemInfo.name} 
                draggable="true"
                onDragStart={drag}
            >
                <img src={props.iconPath} alt={props.itemInfo.name}></img>
            </div>
        </div>

    );
}

export default Item;