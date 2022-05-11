import React from "react";
import iconPath from "../iconPaths";
import BoardHex from "./BoardHex";

function Board(props) {
    const unitIcons = iconPath("unit");
    
    return (
        <div className="boardhex-main">
            <div className="board-container">
            {props.boardState.map(hex => {
                if (!hex.unitIcon) {
                    hex.unitIcon = unitIcons[hex.unitId];
                }
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