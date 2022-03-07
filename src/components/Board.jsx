import React, {useState} from "react";
import genEmptyBoard from "../genEmptyBoard";
import BoardHex from "./BoardHex";

function Board(props) {

    const [boardState, updateBoardState] = useState(genEmptyBoard());

    // initial reception of onDrop handling for placing units and items;
    // updates boardState depending on the situation
    //      - placing unit already on the board onto a different space: handleUnitHexSwap
    //      - placing unit already on the board into the hex it was initially placed (no movement)
    // "updatedHex" is an array object with its destination hexId
    // "prevHexId" is the hex id that "updatedHex" used to be at
    function handleBoardDrop(updatedHex, prevHexId) { 

        if (prevHexId === -1) {
            updateBoardState(prevBoardState => {
                const updatedBoardState = prevBoardState;
                updatedBoardState[updatedHex.hexId] = updatedHex;
                return updatedBoardState;
            });
        } else {
            updateBoardState(prevBoardState => {
                const updatedBoardState = prevBoardState;
                // place array object from destination hexId index into prevHexId index
                updatedBoardState[prevHexId] = updatedBoardState[updatedHex.hexId]; 
                // place updatedHex object into destination hexId index
                updatedBoardState[updatedHex.hexId] = updatedHex;
                return updatedBoardState;
            });
        }


    }

    return (
        <div className="">
            <div className="main">
                <div className="board-container">
                {props.boardState.map(hex => { // trying to "move" boardState into App.jsx where overall state should be updated; props.units is appState.units
                    return (
                        <BoardHex 
                            key={hex.hexId}
                            // hexId={hex.hexId}
                            // hasUnit={hex.hasUnit}
                            // unitId={hex.unitId}
                            // unitName={hex.unitName}
                            // unitCost={hex.unitCost}
                            // unitIcon={hex.unitIcon}
                            // unitTraits={hex.unitTraits}
                            // unitItems={hex.unitItems}
                            handleBoardDrop={handleBoardDrop}
                            appHandleDrop={props.appHandleDrop}
                            placeGridUnit={props.placeGridUnit}
                            appHandleDrag={props.appHandleDrag}
                            hexState={hex}
                        />
                    );
                })}
                </div>
            </div>
        </div>
    );
}

export default Board;