import React from "react";

function BoardHex(props) {

    // costBorder is the className string that updates the border of the BoardHex based on the cost of the unit currently in it
    const hexBorder = props.hexState.hasUnit ? "hex-border hex-cost-" + props.hexState.unitCost.toString() : "hex-border hex-empty"

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();

        // pass dragOrigin value from whatever state object was dropped and the hexId of this BoardHex component to be handled in App.jsx
        props.appHandleDrop(event.dataTransfer.getData("dragOrigin"), props.hexState.hexId);

        // remove highlighting when a Unit, Item, or BoardHex state object is dropped
        event.target.classList.remove("hex-drag-over");
    }

    function handleDragEnter(event) { // TODO: may need to refactor "hex-drag-over" styling trigger
        event.preventDefault();
        if (!props.hexState.hasUnit) {
            event.target.classList.add("hex-drag-over");
        }
    }
    function handleDragLeave(event) { // TODO: may need to refactor "hex-drag-over" styling removal trigger
        event.preventDefault();
        event.target.classList.remove("hex-drag-over");
    }

    function dragfromBoardHex(event) { 
        event.dataTransfer.setData("dragOrigin", "BoardHex");

        // props.appHandleDrag updates the "heldObj" object of appState in App.jsx with props (only when a unit is being dragged from a BoardHex);
        // "BoardHex" parameter informs App.jsx that "heldObj" is being dragged from the Board component
        props.appHandleDrag("BoardHex", props.hexState);
    }

    return (
        <div className={hexBorder}>
            <div    
                className="hex-inner hex-inner-empty"
                onDrop={handleDrop} 
                onDragOver={handleDragOver} 
                onDragEnter={handleDragEnter} 
                onDragLeave={handleDragLeave}
            >
                <div className="hex-has-unit" 
                draggable={props.hexState.hasUnit} 
                onDragStart={dragfromBoardHex}
                >
                    <img src={props.hexState.hasUnit ? props.hexState.unitIcon : null} 
                    alt={props.hexState.hasUnit ? props.hexState.unitName : null}>
                    </img>
                </div>
            </div>
            
        </div>
    );
}

export default BoardHex;