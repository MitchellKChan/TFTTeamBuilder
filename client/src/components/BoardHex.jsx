import React, { useState } from "react";
import Item from "./Item";

function BoardHex(props) {
    
    // useState object to manage BoardHex background styling when a unit is dragged over it 
    const [boardHexBackground, updateBoardHexBackground] = useState(false);

    // costBorder is the className string that updates the border of the BoardHex based on the cost of the unit currently in it
    const hexBorder = props.hexState.hasUnit ? "hex-cost-" + props.hexState.unitCost.toString() : "hex-empty";

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();

        // pass dragOrigin value from whatever state object was dropped and the hexId of this BoardHex component to be handled in App.jsx
        props.appHandleDrop(event.dataTransfer.getData("dragOrigin"), props.hexState.hexId);

        // remove highlighting when a Unit, Item, or BoardHex state object is dropped
        updateBoardHexBackground(() => {return false;});
    }

    function handleDragEnter(event) {
        event.preventDefault();
        if (!props.hexState.hasUnit) {
            updateBoardHexBackground(() => {return true;});
        }
    }
    function handleDragLeave(event) {
        event.preventDefault();
        updateBoardHexBackground(() => {return false;});
    }

    function dragfromBoardHex(event) { 
        event.dataTransfer.setData("dragOrigin", "BoardHex");

        // props.appHandleDrag updates the "heldObj" object of appState in App.jsx with props (only when a unit is being dragged from a BoardHex);
        // "BoardHex" parameter informs App.jsx that "heldObj" is being dragged from the Board component
        props.appHandleDrag("BoardHex", props.hexState);
    }

    return (
        <div className="hex">
            <div className={"hex-border " + hexBorder}>
                <div    
                    className={boardHexBackground ? "hex-inner hex-drag-over" : "hex-inner hex-inner-empty"}
                    onDrop={handleDrop} 
                    onDragOver={handleDragOver} 
                    onDragEnter={handleDragEnter} 
                    onDragLeave={handleDragLeave}
                >
                    <div className="hex-display-position" 
                    draggable={props.hexState.hasUnit} 
                    onDragStart={dragfromBoardHex}
                    >
                        <div className="hex-info">
                            <img src={props.hexState.hasUnit ? props.hexState.unitIcon : null} 
                            alt={props.hexState.hasUnit ? props.hexState.unitName : null}>
                            </img>
                            <div className="hex-unit-name">{props.hexState.hasUnit ? props.hexState.unitName : null}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hex-items">
                {props.hexState.unitItems.map( item => {
                    return (
                        <Item 
                            key={item.id}
                            iconPath={item.itemIcon}
                            itemInfo={item}
                            displayClasses="hex-items-item"
                            equippedHexId={props.hexState.hexId}
                            appHandleDrop={props.appHandleDrop}
                            appHandleDrag={props.appHandleDrag}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default BoardHex;