import React, { useState, useEffect, useContext } from "react";
import Board from "./Board";
import Items from "./Items";
import Traits from "./Traits";
import Units from "./Units";
import Modal from "../shared/UIElements/Modal";
import { AuthContext } from "../shared/context/authContext";
import ErrorModal from "../shared/UIElements/ErrorModal";
import Input from "../shared/FormElements/Input";
import { useForm } from "../shared/hooks/formHook";
import { VALIDATOR_MINLENGTH } from "../shared/util/validator";
import { useHttpClient } from "../shared/hooks/httpHook";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";


function TeamBuilder(props) {
    const auth = useContext(AuthContext);

    // useForm hook to manage composition name when saving 
    const [formState, updateFormState, setFormData] = useForm({
        compName: {
            value: "",
            isValid: false
        }
    }, false);

    // useState object to manage state of showing error when trying to save without logging in first
    const [saveError, updateSaveError] = useState();
    // useState object to manage state of showing save modal
    const [showSaveForm, updateSaveForm] = useState(false);
    function displaySaveForm() {
        if (auth.isLoggedIn){
            updateSaveForm(true);
        } else {
            updateSaveError("You must be logged in before saving a team composition.");
        }
    }
    function cancelSaveForm() {
        updateSaveForm(false);
    }
    function confirmSave() {
        updateSaveForm(false);
        console.log("Saving team composition");
    }
    function clearSaveError() {
        updateSaveError(null);
    }

    const { isLoading, errorMessage, sendRequest, clearErrorMessage } = useHttpClient();
    async function saveSubmitHandler(event) {
        event.preventDefault();
        
        try {
            await sendRequest(
                "http://localhost:3001/api/teamComps",
                "POST",
                JSON.stringify({
                    userId: auth.userId,
                    compName: formState.inputs.compName.value,
                    set: "Set5",
                    boardState: appState.boardState,
                    unitsOnBoard: appState.unitsOnBoard,
                    traits: appState.traits
                }),
                { "Content-Type": "application/json" }
            );
            confirmSave();
        } catch (err) {
            // error handling is done in sendRequest
        }
    }

    // useState object to manage overall state of the application
    const [appState, updateAppState] = useState({
        boardState: props.loadedTeamComp.boardState, // array of BoardHex state objects
        unitsOnBoard: props.loadedTeamComp.unitsOnBoard, // object of how many of each unit are in a BoardHex state in boardState
        traits: props.loadedTeamComp.traits, // object of active traits of units that are in a BoardHex state in boardState
        heldObj: {}, // state object for whatever is currently being dragged; the state can updated from a Unit, BoardHex, or Item component
        showUnitsBy: "Name", // string that notes how Unit Components are displayed in the Units Component; default is alphabetically by name
        showItemsBy: "Craftable", // string that notes how Items Components are displayed in the Item Component; default is craftable items
        errorMessage: "" // string explaining what error occurred on the page; is overwritten after the next valid action is processed
    });
    // trigger diplaying an error message when an erroneous action has occurred
    let errorMessageClasses = appState.errorMessage === "" ? "invisible" : "visible";
    // className strings for how to display Unit Components and Item Components
    let nameButtonClasses = appState.showUnitsBy === "Name" ? "mr-1 btn btn-secondary btn-sm" : "mr-1 btn btn-outline-secondary btn-sm";
    let costButtonClasses = appState.showUnitsBy === "Cost" ? "mr-1 btn btn-secondary btn-sm" : "mr-1 btn btn-outline-secondary btn-sm";
    let originButtonClasses = appState.showUnitsBy === "Origin" ? "mr-1 btn btn-secondary btn-sm" : "mr-1 btn btn-outline-secondary btn-sm";
    let classButtonClasses = appState.showUnitsBy === "Class" ? "mr-1 btn btn-secondary btn-sm" : "mr-1 btn btn-outline-secondary btn-sm";
    let craftableButtonClasses = appState.showItemsBy === "Craftable" ? "mr-1 btn btn-secondary btn-sm" : "mr-1 btn btn-outline-secondary btn-sm";
    let tomeEmblemsButtonClasses = appState.showItemsBy === "Tome Emblems" ? "mr-1 btn btn-secondary btn-sm" : "mr-1 btn btn-outline-secondary btn-sm";
    let radiantButtonClasses = appState.showItemsBy === "Radiant" ? "mr-1 btn btn-secondary btn-sm" : "mr-1 btn btn-outline-secondary btn-sm";
    function appHandleDrop(dragOrigin, targetHexId) {
        let newAppState = appState;
        let updatedHex = {};
        let newErrorMessage = "";
        switch (dragOrigin) {
            case "Unit":

                // updatedHex reassigned to object created with appState.heldObj values
                updatedHex = { 
                    ...appState.boardState[targetHexId],
                    ["hasUnit"]: true,
                    ["unitId"]: appState.heldObj.unitId,
                    ["unitName"]: appState.heldObj.unitName,
                    ["unitCost"]: appState.heldObj.unitCost,
                    ["unitIcon"]: appState.heldObj.unitIcon,
                    ["unitTraits"]: appState.heldObj.unitTraits,
                };                    

                // check if targetHexId had a unit prior to heldObj being dropped in it (replace / remove previous unit):
                //      - if so, call removeUnit on the BoardHex component in targetHexId
                if (appState.boardState[targetHexId].hasUnit) {
                    newAppState = removeUnit(newAppState, appState.boardState[targetHexId]);
                }

                // check if unit of updatedHex is in appState.unitsOnBoard (prevent duplicate unit traits from counting):
                //      - if not, add its traits to newAppState.traits and add a key-value object to newAppState.unitsOnBoard
                //      - if so, reassign newAppState.unitsOnBoard with the spread operator to itself and increment the value (number of copies of unit on board)
                if (!appState.unitsOnBoard[updatedHex.unitName]) {
                    newAppState.traits = addTraits(appState.traits, updatedHex);
                    newAppState.unitsOnBoard = {
                        ...newAppState.unitsOnBoard,
                        [updatedHex.unitName]: 1
                    };
                } else {
                    newAppState.unitsOnBoard = {
                        ...newAppState.unitsOnBoard,
                        [updatedHex.unitName]: newAppState.unitsOnBoard[updatedHex.unitName] + 1
                    };
                }

                // "place" the heldObj (updatedHex) in the targetHexId index of newAppState.boardState;
                // this "removes" any unit that was previously in the targetHexId
                newAppState.boardState[targetHexId] = updatedHex;
    
                break;
            case "Item":    
            
                // check if targetHexId is -1 (item is being dragged from BoardHex Component to Items Component)
                //      - if so, call removeItem and assign it to newAppState
                if (targetHexId === -1) {
                    newAppState = removeItem(newAppState, appState.heldObj);
                } else {
                //      - if not, check if appState.boardState[targetHexId].hasUnit is false
                //          -- if so, update error message that item cannot be placed in hexes that do not have units
                //          -- if not, check whether the unit can be equipped with the heldObj item; ****TODO: BREAK OUT THIS ITEM EQUIPPING VALIDATION INTO OTHER FUNCTIONS*****
                    if (!appState.boardState[targetHexId].hasUnit) { 
                        newErrorMessage = appState.heldObj.name + " should be equipped after placing a unit on a hex.";
                    } else {
                        // check if targetHexId has space to receive another item; appState.boardState[targetHexId].unitItems cannot have more than 3 objects
                        if (Object.keys(appState.boardState[targetHexId].unitItems).length < 3) {
                            newAppState.boardState[targetHexId] = {
                                ...appState.boardState[targetHexId],
                                ["unitItems"]: {
                                    ...appState.boardState[targetHexId].unitItems,
                                    [appState.heldObj.id]: appState.heldObj // TODO: refactor key to allow multiple non-unique items to be equipped properly
                                }
                            };
                        } else {
                            newErrorMessage = "A unit cannot be equipped with more than 3 items.";
                        }

                        // check if the heldObj item was being dragged from a BoardHex Component
                        //      - if so, remove it from the unitItems object of the heldObj.prevHexId BoardHex Component 
                        if (appState.heldObj.prevHexId) {
                            newAppState = removeItem(newAppState, appState.heldObj);
                        }
                    }
                }
                break;
            case "BoardHex":
                if (targetHexId === -1) {
    
                    // updatedHex reassigned to objecte created with appState.heldObj.hexId to maintain hexId for BoardHex that is dragged off Board while resetting other properties
                    updatedHex = { 
                        hexId: appState.heldObj.hexId,
                        hasUnit: false,
                        unitId: null,
                        unitName: null,
                        unitCost: null,
                        unitIcon: null,
                        unitTraits: null,
                        unitItems: {}
                    };                    

                    newAppState = removeUnit(newAppState, appState.heldObj);

                    newAppState.boardState[updatedHex.hexId] = updatedHex;

                } else {
    
                    // updatedHex reassigned to object created from newAppState.heldObj since property names match when dragging from Board component
                    updatedHex = {
                        ...newAppState.heldObj,
                        ["hexId"]: targetHexId // update value of "hexId" for updatedHex to targetHexId to maintain hexId of BoardHex state
                    };

                    // swap hex info for targetHexId and appState.heldObj.hexId: 
                    //      - "place" appState.boardState[targetHexId] (BoardHex state for targetHexId) into appState.heldObj.hexId
                    //      - update value of "hexId" for appState.heldObj.hexId to appState.heldObj.hexId to maintain hexId of BoardHex origin state
                    newAppState.boardState[appState.heldObj.hexId] = appState.boardState[targetHexId];
                    newAppState.boardState[appState.heldObj.hexId].hexId = appState.heldObj.hexId;

                    // "place" the heldObj (updatedHex) in the targetHexId index of newAppState.boardState;
                    // this "removes" any unit that was previously in the targetHexId
                    newAppState.boardState[targetHexId] = updatedHex;
                        
                }
                break;
            default:
                console.log(appState.heldObj.unitName + " dropped from hex grid");
                break;
        }
        updateAppState(() => {
            const AppState = {
                ...newAppState,
                errorMessage: newErrorMessage,
                heldObj: {}
            };
            return AppState;
        });
    }
    function appHandleDrag(dragType, object) {
        // switch statement to validate what object type is being dragged (debugging purposes only)
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
            const newAppState = {
                ...appState,
                heldObj: object
            };
            return newAppState;
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
    // removeItem is called when appHandleDrop is passed "Item" as its dragOrigin parameter in one of the following situations:
    //      - dragging an Item Component from one BoardHex Component to a different one (reequip item)
    //      - dragging an Item Component from a BoardHex Component to the Items Component (remove item)
    // removeItem deletes the heldItem from the unitItems object of the heldItem.prevHexId BoardHex Component 
    function removeItem(appState, heldItem) {
        delete appState.boardState[heldItem.prevHexId].unitItems[heldItem.id];

        return appState;
    }
    function selectUnitSort(event) {
        updateAppState(appState => {
            const newAppState = {
                ...appState,
                showUnitsBy: event.target.innerText
            };
            return newAppState;
        });
    }
    function selectItemSort(event) {
        updateAppState(appState => {
            const newAppState = {
                ...appState,
                showItemsBy: event.target.innerText
            };
            return newAppState;
        });
    }



    return (
        <React.Fragment>
            <ErrorModal error={saveError} onClear={clearSaveError}/>
            {auth.isLoggedIn && 
                <Modal 
                    show={showSaveForm}
                    onCancel={cancelSaveForm}
                    header="What name would you like this new team composition to have?" 
                    footerClass="" 
                    footer={
                        <React.Fragment>
                            <button onClick={cancelSaveForm}>Cancel</button>
                            <button onClick={saveSubmitHandler}>Save</button>
                        </React.Fragment>
                    }
                >
                    <form>
                        <Input 
                            element="input"
                            id="compName"
                            type="text"
                            label="Composition Name"
                            validators={[VALIDATOR_MINLENGTH(8)]}
                            errorText="Please enter a valid composition name with at least 8 characters."
                            onInput={updateFormState}
                        />
                    </form>
                </Modal>
            }
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-xl-2 traits">
                        <Traits activeTraits={appState.traits}/>
                    </div>
                    <div className="col-xl-10">
                        <div className="row pb-3">
                            <div className="col-lg-9">
                                <Board 
                                    key={appState}
                                    boardState={appState.boardState} 
                                    appHandleDrop={appHandleDrop} 
                                    appHandleDrag={appHandleDrag}
                                />
                            </div>
                            <div className="col-lg-3">
                                <div>
                                    <button className="btn btn-outline-success btn-sm save-button" onClick={displaySaveForm}>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="py-3">
                            <div className={"error-message p-1 " + errorMessageClasses}>
                                {appState.errorMessage}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="mb-md-2">
                                    <button type="button" className={nameButtonClasses} onClick={selectUnitSort}>Name</button>
                                    <button type="button" className={costButtonClasses} onClick={selectUnitSort}>Cost</button>
                                    <button type="button" className={originButtonClasses} onClick={selectUnitSort}>Origin</button>
                                    <button type="button" className={classButtonClasses} onClick={selectUnitSort}>Class</button>
                                </div>
                                <Units 
                                    heldObj={appState.heldObj}
                                    showUnitsBy={appState.showUnitsBy}
                                    appHandleDrop={appHandleDrop} 
                                    appHandleDrag={appHandleDrag} 
                                />
                            </div>
                            <div className="col-xl-4">
                                <div className="pb-2 row">
                                    <div className="mb-md-2">
                                        <button type="button" className={craftableButtonClasses} onClick={selectItemSort}>Craftable</button>
                                        <button type="button" className={tomeEmblemsButtonClasses} onClick={selectItemSort}>Tome Emblems</button>
                                        <button type="button" className={radiantButtonClasses} onClick={selectItemSort}>Radiant</button>
                                    </div>
                                    <Items 
                                        heldObj={appState.heldObj}
                                        showItemsBy={appState.showItemsBy}
                                        appHandleDrop={appHandleDrop} 
                                        appHandleDrag={appHandleDrag}
                                    />
                                </div>
                                <div className="row trait">
                                    <div className="description-title">TFT Team Builder Usage</div>
                                    <ul>
                                        <li>Units can be placed on the board by dragging them to a hex</li>
                                        <li>Items can be equipped to units by dragging them an occupied hex</li>
                                        <li>Units can be removed from the board by dragging them to the units area</li>
                                        <li>Items can be removed from the board by dragging them to the items area</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default TeamBuilder;
