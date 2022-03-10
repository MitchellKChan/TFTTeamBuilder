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
                    //      - if so, call removeUnit on the BoardHex component in targetHexId
                    if (prevAppState.boardState[targetHexId].hasUnit) {
                        console.log(prevAppState.boardState[targetHexId].unitName + " in hexId " + targetHexId + " is being replaced / removed");
                        updatedAppState = removeUnit(updatedAppState, prevAppState.boardState[targetHexId]);
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
                    return updatedAppState;
                });
                break;
            case "Items":
                console.log(appState.heldObj.name + " dropped from Items component into hexId " + targetHexId);
                break;
            case "BoardHex":
                if (targetHexId === -1) {
                    console.log(appState.heldObj.unitName + " is being dragged off Board and dropped into Units");
                    updateAppState(prevAppState => {
                        let updatedAppState = prevAppState;
    
                        // updatedHex const created with prevAppState.heldObj.hexId to maintain hexId for BoardHex that is dragged off Board while resetting other properties
                        const updatedHex = { 
                            hexId: prevAppState.heldObj.hexId,
                            hasUnit: false,
                            unitId: null,
                            unitName: null,
                            unitCost: null,
                            unitIcon: null,
                            unitTraits: null,
                            unitItems: null
                        };                    
    
                        updatedAppState = removeUnit(updatedAppState, prevAppState.heldObj);

                        updatedAppState.boardState[updatedHex.hexId] = updatedHex;

                        updatedAppState.heldObj = {};
                        return updatedAppState;
                    });
                    break;
                } else {
                    console.log(appState.heldObj.unitName + " dropped from BoardHex hexId " + appState.heldObj.hexId + " into hexId " + targetHexId);
                    console.log("targetHexId " + targetHexId + " had " + appState.boardState[targetHexId].unitName + " previously");
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
                        return updatedAppState;
                    });
                }

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
                break;
            case "Item":
                console.log(object.name + " being dragged from Items component");
                break;
            case "BoardHex":
                console.log(object.unitName + " being dragged from Board component");
                break;
            default:
                console.log(object + " being dragged from hex grid");
                break;
        }
        updateAppState(appState => {
            const updatedAppState = {
                ...appState,
                ["heldObj"]: object
            };
            return updatedAppState;
        });
    }

    // addTraits is called when appHandleDrop is passed "Unit" as its dragOrigin parameter in one of the following situations:
    //      - dragging a Unit Component from the Units component to a BoardHex component
    //      - clicking a Unit Component in the Units component **NOT IMPLEMENTED YET**
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

    // removeTraits is called when appHandleDrop is passed "Unit" or "BoardHex" as its dragOrigin parameter with their respective situations:
    //      - "Unit": dragging a Unit component from the Units component to a BoardHex component that is contains a unit (unit replacement)
    //      - "BoardHex": dragging a Unit component from a BoardHex component to the Units component (unit removal)
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

    
    // removeUnit is called when appHandleDrop is passed "Unit" or "BoardHex" as its dragOrigin parameter with their respective situations:
    //      - "Unit": dragging a Unit component from the Units component to a BoardHex component that is contains a unit (unit replacement)
    //      - "BoardHex": dragging a Unit component from a BoardHex component to the Units component (unit removal)
    // removeUnit checks if there is more than one copy of the unit being removed in unitsOnBoard;
    //      - if so, decrement the unit count of the unit being removed in unitsOnBoard by 1
    //      - it not, call removeTraits for the unit being removed, set this to appState.traits, and delete the unit's object count from unitsOnBoard
    function removeUnit(appState, removedUnit) {
        if (appState.unitsOnBoard[removedUnit.unitName] > 1) {
            appState.unitsOnBoard = {
                ...appState.unitsOnBoard,
                [removedUnit.unitName]: appState.unitsOnBoard[removedUnit.unitName] - 1
            };
        } else {
            // remove traits of last copy of unit being removed from targetHexId
            appState.traits = removeTraits(appState.traits, removedUnit);
            // delete the unit's object count from unitsOnBoard
            delete appState.unitsOnBoard[removedUnit.unitName];
        }

        return appState;
    }

    // console.log(appState.traits);

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
                                    key={appState.heldObj}
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
                                    heldObj={appState.heldObj}
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
