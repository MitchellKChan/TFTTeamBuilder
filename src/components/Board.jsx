import React from "react";
import BoardHex from "./BoardHex";

function Board(props) {
    return (
        <div className="boardhex-main">
            <div className="board-container">
            {props.boardState.map(hex => {
                return (
                    <BoardHex 
                        key={hex.hexId.toString() + hex.unitName}
                        appHandleDrop={props.appHandleDrop}
                        appHandleDrag={props.appHandleDrag}
                        hexState={hex}
                    />
                );
            })}
            </div>
        </div>
    );
}

export default Board;