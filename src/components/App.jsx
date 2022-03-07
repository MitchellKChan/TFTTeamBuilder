import React, { useState } from "react";
import genEmptyBoard from "../genEmptyBoard";
import Board from "./Board";
import Items from "./Items";
import Traits from "./Traits";
import Units from "./Units";


function App() {

    const [appState, updateAppState] = useState({
        boardState: genEmptyBoard(),
        traits: {},
        heldObj: {}
    });

    function appHandleDrop(dragOrigin, targetHexId) {
        switch (dragOrigin) {
            case "unit pool":
                console.log(appState.heldObj.unitName + " dropped from unit pool into hexId " + targetHexId);
                updateAppState(prevAppState => {
                    let updatedAppState = prevAppState;
                    const updatedHex = {
                        ...updatedAppState.boardState[targetHexId],
                        ["hasUnit"]: true,
                        ["unitId"]: updatedAppState.heldObj.unitId,
                        ["unitName"]: updatedAppState.heldObj.unitName,
                        ["unitCost"]: updatedAppState.heldObj.unitCost,
                        ["unitIcon"]: updatedAppState.heldObj.unitIcon,
                        ["unitTraits"]: updatedAppState.heldObj.unitTraits,
                    };
                    updatedAppState.boardState[targetHexId] = updatedHex;
                    updatedHex.unitTraits.forEach(trait => {
                        if (updatedAppState.traits.hasOwnProperty(trait)) {
                            updatedAppState.traits = {
                                ...updatedAppState.traits,
                                [trait]: updatedAppState.traits[trait] + 1
                            };
                        } else {
                            // console.log("adding 1 " + trait + " trait to board");
                            updatedAppState.traits = {
                                ...updatedAppState.traits,
                                [trait]: 1
                            };
                        }
                    })
                    updatedAppState.heldObj = {};
                    console.log(updatedAppState);
                    return updatedAppState;
                });
                break;
            case "item pool":
                console.log(appState.heldObj.name + " dropped from item pool into hexId " + targetHexId);
                break;
            default:
                console.log(appState.heldObj.unitName + " dropped from hex grid");
                break;
        }
    }

    function placeGridUnit (updatedHex) {
        updateAppState(prevAppState => {
            let updatedAppState = prevAppState;
            updatedAppState.boardState[updatedHex.hexId] = updatedHex;
            const addedTraits = updatedHex.unitTraits.split(",");
            addedTraits.forEach(trait => {
                if (updatedAppState.traits.hasOwnProperty(trait)) {
                    updatedAppState.traits = {
                        ...updatedAppState.traits,
                        [trait]: updatedAppState.traits[trait] + 1
                    };
                } else {
                    console.log("adding 1 " + trait + " trait to board");
                    updatedAppState.traits = {
                        ...updatedAppState.traits,
                        [trait]: 1
                    };
                }
            })
            return updatedAppState;
        });
        // console.log(appState);
    }

    function appHandleDrag(dragType, object) {
        switch (dragType) {
            case "unit pool":
                console.log(object.unitName + " being dragged from unit pool");
                updateAppState(appState => {
                    const updatedAppState = {
                        ...appState,
                        ["heldObj"]: object
                    };
                    return updatedAppState;
                });
                break;
            case "item":
                console.log(object.name + " being dragged from item pool");
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
                                    placeGridUnit={placeGridUnit}
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
                            <div className=""><Units appHandleDrop={appHandleDrop} appHandleDrag={appHandleDrag} /></div>
                        </div>
                        <div className="col-xl-3 items">
                            <div>Items</div>
                            <div className=""><Items appHandleDrop={appHandleDrop} appHandleDrag={appHandleDrag}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
