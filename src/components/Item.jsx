import React from "react";

function Item(props) {

    function drag(event) { // TODO: implement to be able to equip items to hexes that have units
        event.dataTransfer.setData("dragOrigin", "Item");
        props.appHandleDrag("Item", props.itemInfo);
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