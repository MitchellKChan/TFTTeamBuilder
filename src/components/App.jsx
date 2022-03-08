import React, { useState } from "react";
import genEmptyBoard from "../genEmptyBoard";
import Board from "./Board";
import Items from "./Items";
import Traits from "./Traits";
import Units from "./Units";


function App() {

    const [appState, updateAppState] = useState({
        boardState: genEmptyBoard(), // array of BoardHex state objects
        unitsOnBoard: {}, // object of how many of each unit are in a BoardHex state in boardState
        traits: {}, // object of active traits of units that are in a BoardHex state in boardState
        heldObj: {} // state object for whatever is currently being dragged; the state can updated from a Unit, BoardHex, or Item component
    });

    function appHandleDrop(dragOrigin, targetHexId) {
        switch (dragOrigin) {
            case "Unit":
                console.log(appState.heldObj.unitName + " dropped from Units component into hexId " + targetHexId);
                console.log("targetHexId " + targetHexId + " had " + appState.boardState[targetHexId].unitName + " previously");
                
                updateAppState(prevAppState => {
                    let updatedAppState = prevAppState;

                    // updatedHex const created from updatedAppState.heldObj values since properties are named differently when dragging from Units component than from Board component
                    const updatedHex = { 
                        ...prevAppState.boardState[targetHexId],
                        ["hasUnit"]: true,
                        ["unitId"]: prevAppState.heldObj.unitId,
                        ["unitName"]: prevAppState.heldObj.unitName,
                        ["unitCost"]: prevAppState.heldObj.unitCost,
                        ["unitIcon"]: prevAppState.heldObj.unitIcon,
                        ["unitTraits"]: prevAppState.heldObj.unitTraits,
                    };                    

                    // check if targetHexId had a unit prior to heldObj being dropped in it (replace / remove previous unit):
                    //      - if so, check if there is more than one copy of a unit in unitsOnBoard;
                    //              -- if so, decrement the unit count of the removed unit in unitsOnBoard by 1
                    //              -- it not, call removeTraits for the unit being removed, set this to updatedAppState.traits, and delete the unit's object count from unitsOnBoard
                    // ***** TODO: CLEAN UP OBJECT VALUE REFERENCES SO THIS ACTUALLY READABLE AND UNDERSTANDABLE *****
                    if (prevAppState.boardState[targetHexId].hasUnit) {
                        console.log(prevAppState.boardState[targetHexId].unitName + " in hexId " + targetHexId + " is being replaced / removed");
                        if (updatedAppState.unitsOnBoard[prevAppState.boardState[targetHexId].unitName] > 1) {
                            updatedAppState.unitsOnBoard = {
                                ...updatedAppState.unitsOnBoard,
                                [prevAppState.boardState[targetHexId].unitName]: updatedAppState.unitsOnBoard[prevAppState.boardState[targetHexId].unitName] - 1
                            };
                        } else {
                            // remove traits of last copy of unit being removed from targetHexId
                            updatedAppState.traits = removeTraits(prevAppState.traits, prevAppState.boardState[targetHexId]);
                            // delete the unit's object count from unitsOnBoard
                            delete updatedAppState.unitsOnBoard[prevAppState.boardState[targetHexId].unitName]; // *** TODO: FIX THIS SO UNIT IS REMOVED FROM unitsOnBoard SUCCESSFULLY AND PROPERLY ***
                        }
                    }

                    // check if unit of updatedHex is in appState.unitsOnBoard (prevent duplicate unit traits from counting):
                    //      - if not, add its traits to updatedAppState.traits and add a key-value object to updatedAppState.unitsOnBoard
                    if (!updatedAppState.unitsOnBoard[updatedHex.unitName]) {
                        updatedAppState.traits = addTraits(prevAppState.traits, updatedHex);
                        updatedAppState.unitsOnBoard = {
                            ...updatedAppState.unitsOnBoard,
                            [updatedHex.unitName]: 1
                        };
                    } else {
                        updatedAppState.unitsOnBoard = {
                            ...updatedAppState.unitsOnBoard,
                            [updatedHex.unitName]: updatedAppState.unitsOnBoard[updatedHex.unitName] + 1
                        };
                    }

                    // "place" the heldObj (updatedHex) in the targetHexId index of updatedAppState.boardState;
                    // this "removes" any unit that was previously in the targetHexId
                    updatedAppState.boardState[targetHexId] = updatedHex;
                    
                    updatedAppState.heldObj = {};
                    console.log(updatedAppState.traits);
                    console.log(updatedAppState.unitsOnBoard);
                    return updatedAppState;
                });
                break;
            case "Items":
                console.log(appState.heldObj.name + " dropped from Items component into hexId " + targetHexId);
                break;
            case "BoardHex":
                console.log(appState.heldObj.unitName + " dropped from BoardHex hexId " + appState.heldObj.hexId + " into hexId " + targetHexId);
                console.log("targetHexId " + targetHexId + " had " + appState.boardState[targetHexId].unitName + " previously");
                // console.log(appState.heldObj);
                updateAppState(prevAppState => {
                    let updatedAppState = prevAppState;

                    // updatedHex const created from updatedAppState.heldObj since property names match when dragging from Board component
                    const updatedHex = {
                        ...updatedAppState.heldObj,
                        ["hexId"]: targetHexId // update value of "hexId" for updatedHex to targetHexId to maintain hexId of BoardHex state
                    };

                    // swap hex info for targetHexId and prevAppState.heldObj.hexId: 
                    //      - "place" prevAppState.boardState[targetHexId] (BoardHex state for targetHexId) into prevAppState.heldObj.hexId
                    //      - update value of "hexId" for prevAppState.heldObj.hexId to prevAppState.heldObj.hexId to maintain hexId of BoardHex origin state
                    updatedAppState.boardState[prevAppState.heldObj.hexId] = prevAppState.boardState[targetHexId];
                    updatedAppState.boardState[prevAppState.heldObj.hexId].hexId = prevAppState.heldObj.hexId;

                    // "place" the heldObj (updatedHex) in the targetHexId index of updatedAppState.boardState;
                    // this "removes" any unit that was previously in the targetHexId
                    updatedAppState.boardState[targetHexId] = updatedHex;
                    
                    updatedAppState.heldObj = {};
                    console.log(updatedAppState.traits);
                    console.log(updatedAppState.unitsOnBoard);
                    return updatedAppState;
                });
                break;
            default:
                console.log(appState.heldObj.unitName + " dropped from hex grid");
                break;
        }
    }

    function appHandleDrag(dragType, object) {
        switch (dragType) {
            case "Unit":
                console.log(object.unitName + " being dragged from Units component");
                updateAppState(appState => {
                    const updatedAppState = {
                        ...appState,
                        ["heldObj"]: object
                    };
                    return updatedAppState;
                });
                break;
            case "Item":
                console.log(object.name + " being dragged from Items component");
                updateAppState(appState => {
                    const updatedAppState = {
                        ...appState,
                        ["heldObj"]: object
                    };
                    return updatedAppState;
                });
                break;
            case "BoardHex":
                console.log(object.unitName + " being dragged from Board component");
                updateAppState(appState => {
                    const updatedAppState = {
                        ...appState,
                        ["heldObj"]: object
                    };
                    return updatedAppState;
                });
                break;
            default:
                console.log(object + " being dragged from hex grid");
                break;
        }
    }

    // addTraits is called when appHandleDrop is passed "unit pool" as its dragOrigin parameter in one of the following situations:
    //      - dragging a Unit Component from the Units component to a BoardHex component
    //      - clicking a Unit Component in the Units component
    // addTraits updates the "traits" object of appState by doing the following when needed:
    //      - adding objects for each trait of the "heldObj" object of appState that were not previously active
    //      - incrementing the value for each trait of the "heldObj" object of appState that were previously active
    function addTraits(traits, newUnit) {
        newUnit.unitTraits.forEach(newUnitTrait => {
            if (traits.hasOwnProperty(newUnitTrait)) {
                traits = {
                    ...traits,
                    [newUnitTrait]: traits[newUnitTrait] + 1
                };
            } else {
                traits = {
                    ...traits,
                    [newUnitTrait]: 1
                };
            }
        })

        return traits;
    }

    // removeTraits is called when appHandleDrop is passed "[TBD]" as its dragOrigin parameter in one of the following situations:
    //      - dragging a Unit component from the Units component to a BoardHex component that is contains a unit (units replacement)
    //      - dragging a Unit component off a BoardHex component to the Units component (unit removal)
    // removeTraits updates the "traits" object of appState by doing the following when needed:
    //      - decrementing the value for each trait of the unit that is being replaced or removed from a BoardHex component when the value is at least 2
    //      - removing objects for each trait of the unit that is being replaced or removed from a BoardHex component when the value is 1
    function removeTraits(traits, removedUnit) {
        removedUnit.unitTraits.forEach(removedUnitTrait => {
            if (traits[removedUnitTrait] > 1) {
                traits = {
                    ...traits,
                    [removedUnitTrait]: traits[removedUnitTrait] - 1
                };
            } else {
                console.log("deleting " + removedUnitTrait);
                delete traits[removedUnitTrait];  // *** seems to be working properly; may come back to update to improve time complexity ***
            }
        })

        return traits;
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-2 traits">
                    <div className="">
                        <Traits activeTraits={appState.traits}/>
                    </div>
                </div>
                <div className="col-xl-10">
                    <div className="row pb-4">
                        <div className="col-lg-9 board">
                            <div className="">
                                <Board 
                                    boardState={appState.boardState} 
                                    appHandleDrop={appHandleDrop} 
                                    appHandleDrag={appHandleDrag}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 equipped-items">
                            {/* <div className="">Equipped Items</div> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-9 units">
                            <div>Units</div>
                            <div className="">
                                <Units 
                                    appHandleDrop={appHandleDrop} 
                                    appHandleDrag={appHandleDrag} 
                                />
                            </div>
                        </div>
                        <div className="col-xl-3 items">
                            <div>Items</div>
                            <div className="">
                                <Items 
                                    appHandleDrop={appHandleDrop} 
                                    appHandleDrag={appHandleDrag}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
