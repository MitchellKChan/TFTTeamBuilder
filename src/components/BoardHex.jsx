import React, {useState} from "react";

function BoardHex(props) {

    const [hexState, updateHexState] = useState({
        hexId: props.hexId,
        hasUnit: props.hasUnit,
        unitId: props.unitId,
        unitName: props.unitName,
        unitCost: props.unitCost,
        unitIcon: props.unitIcon,
        unitTraits: props.unitTraits,
        unitItems: props.unitItems
    });

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();

        const updatedHex = {
            ...hexState,
            ["hasUnit"]: true,
            ["unitId"]: event.dataTransfer.getData("unitId"),
            ["unitName"]: event.dataTransfer.getData("unitName"),
            ["unitCost"]: event.dataTransfer.getData("unitCost"),
            ["unitIcon"]: event.dataTransfer.getData("unitIconPath"),
            ["unitTraits"]: event.dataTransfer.getData("unitTraits")
        };

        if (event.dataTransfer.getData("hexHadUnit")) {

            const updatedHexFromBoard = {
                ... updatedHex,
                ["unitItems"]: event.dataTransfer.getData("unitItems")
            }

            props.handleBoardDrop(updatedHexFromBoard, event.dataTransfer.getData("prevHexId"));
            updateHexState(() => {
                return updatedHexFromBoard;
            });
        } else {
            props.handleBoardDrop(updatedHex, -1);
            updateHexState(() => {
                return updatedHex;
            });
        }


        event.target.classList.remove("hex-drag-over");
    }

    function handleDragEnter(event) { // TODO: should refactor "hex-drag-over" styling trigger
        event.preventDefault();
        if (!props.hasUnit) {
            event.target.classList.add("hex-drag-over");
        }
    }
    function handleDragLeave(event) { // TODO: should refactor "hex-drag-over" styling removal trigger
        event.preventDefault();
        event.target.classList.remove("hex-drag-over");
    }

    function hasUnitDrag(event) { // TODO: may need to refactor in order to update origin hexState when dragging from board
        event.dataTransfer.setData("prevHexId", hexState.hexId);
        event.dataTransfer.setData("hexHadUnit", true);
        event.dataTransfer.setData("unitId", hexState.unitId);
        event.dataTransfer.setData("unitName", hexState.unitName);
        event.dataTransfer.setData("unitCost", hexState.unitCost);
        event.dataTransfer.setData("unitIconPath", hexState.unitIcon);
        event.dataTransfer.setData("unitTraits", hexState.unitTraits);
        event.dataTransfer.setData("unitItems", hexState.unitItems);
    }

    return (
        <div 
            className={hexState.hasUnit ? "hex-border hex-occupied" : "hex-border hex-empty"} >
            <div    
                className="hex-inner hex-inner-empty"
                onDrop={handleDrop} 
                onDragOver={handleDragOver} 
                onDragEnter={handleDragEnter} 
                onDragLeave={handleDragLeave}
            >
                {hexState.hasUnit ? <div className="hex-has-unit" draggable="true" onDragStart={hasUnitDrag}><img src={hexState.unitIcon} alt={hexState.unitName}></img></div> : null}
            </div>
            
        </div>
    );
}

export default BoardHex;