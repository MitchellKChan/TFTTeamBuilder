import React, {useState} from "react";

function BoardHex(props) {
    // const [hexState, updateHexState] = useState({
    //     hexId: props.hexId,
    //     hasUnit: props.hasUnit,
    //     unitId: props.unitId,
    //     unitName: props.unitName,
    //     unitCost: props.unitCost,
    //     unitIcon: props.unitIcon,
    //     unitTraits: props.unitTraits,
    //     unitItems: props.unitItems
    // });

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();

        // console.log("hexId " + props.hexState.hexId + " hasUnit is " + props.hexState.hasUnit);

        const updatedHex = {
            ...props.hexState,
            ["hasUnit"]: true,
            ["unitId"]: event.dataTransfer.getData("unitId"),
            ["unitName"]: event.dataTransfer.getData("unitName"),
            ["unitCost"]: event.dataTransfer.getData("unitCost"),
            ["unitIcon"]: event.dataTransfer.getData("unitIconPath"),
            ["unitTraits"]: event.dataTransfer.getData("unitTraits")
        };

        props.appHandleDrop(event.dataTransfer.getData("dragOrigin"), props.hexState.hexId);

        // if (event.dataTransfer.getData("hexHadUnit")) {
        //     console.log("unit dragged from hex NOT CHAMP POOL");
        //     console.log("initial hexId: " + event.dataTransfer.getData("prevHexId") + "; target hexId: " + hexState.hexId);
        //     const updatedHexFromBoard = {
        //         ... updatedHex,
        //         ["unitItems"]: event.dataTransfer.getData("unitItems")
        //     }
        //     console.log("updatedHexFromBoard: ");
        //     console.log(updatedHexFromBoard);
        //     console.log("hexState of drop target: ");
        //     console.log(hexState);
        //     props.handleBoardDrop(updatedHexFromBoard, event.dataTransfer.getData("prevHexId"));
        //     updateHexState(() => {
        //         return updatedHexFromBoard;
        //     });
        // } else {
        //     props.placeGridUnit(updatedHex);
        //     props.handleBoardDrop(updatedHex, -1);
        //     updateHexState(() => {
        //         return updatedHex;
        //     });
        // }


        event.target.classList.remove("hex-drag-over");
    }

    function handleDragEnter(event) { // TODO: should refactor "hex-drag-over" styling trigger
        event.preventDefault();
        if (!props.hexState.hasUnit) {
            event.target.classList.add("hex-drag-over");
        }
    }
    function handleDragLeave(event) { // TODO: should refactor "hex-drag-over" styling removal trigger
        event.preventDefault();
        event.target.classList.remove("hex-drag-over");
    }

    // function hasUnitDrag(event) { // TODO: may need to refactor in order to update origin hexState when dragging from board
    //     console.log("hexState being dragged: ");
    //     console.log(hexState);
    //     event.dataTransfer.setData("prevHexId", hexState.hexId);
    //     event.dataTransfer.setData("hexHadUnit", true);
    //     event.dataTransfer.setData("unitId", hexState.unitId);
    //     event.dataTransfer.setData("unitName", hexState.unitName);
    //     event.dataTransfer.setData("unitCost", hexState.unitCost);
    //     event.dataTransfer.setData("unitIconPath", hexState.unitIcon);
    //     event.dataTransfer.setData("unitTraits", hexState.unitTraits);
    //     event.dataTransfer.setData("unitItems", hexState.unitItems);

    //     props.appHandleDrag("unitBoard", hexState.unitName);
    // }

    return (
        // ***** Old Board Hex Return Div with local useState *****
        // <div 
        //     className={hexState.hasUnit ? "hex-border hex-occupied" : "hex-border hex-empty"} >
        //     <div    
        //         className="hex-inner hex-inner-empty"
        //         onDrop={handleDrop} 
        //         onDragOver={handleDragOver} 
        //         onDragEnter={handleDragEnter} 
        //         onDragLeave={handleDragLeave}
        //     >
        //         {hexState.hasUnit ? <div className="hex-has-unit" draggable="true" onDragStart={hasUnitDrag}><img src={hexState.unitIcon} alt={hexState.unitName}></img></div> : null}
        //     </div>
        // </div>

        // ***** New Board Hex Return Div with appState hex props *****
        <div 
            className={props.hexState.hasUnit ? "hex-border hex-occupied" : "hex-border hex-empty"} >
            <div    
                className="hex-inner hex-inner-empty"
                onDrop={handleDrop} 
                onDragOver={handleDragOver} 
                onDragEnter={handleDragEnter} 
                onDragLeave={handleDragLeave}
            >
                <div className="hex-has-unit" 
                // draggable={props.hexState.hasUnit} 
                // onDragStart={hasUnitDrag}
                >
                    <img src={props.hexState.unitIcon} alt={props.hexState.unitName}></img>
                </div>
            </div>
            
        </div>
    );
}

export default BoardHex;