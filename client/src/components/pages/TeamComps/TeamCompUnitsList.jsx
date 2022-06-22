import React from "react";
import iconPath from "../../../iconPaths";
import UnitIcon from "../../../shared/UnitIcon/UnitIcon";
import Item from "../../Item";

function TeamCompUnitsList(props) {
    // iconPath call with parameter "unit" to save the object of Unit icon paths to unitIcons
    const unitIcons = iconPath("unit");

    const orderedUnits = organizeUnits(props.boardState);

    function organizeUnits(boardState) {
        const boardUnits = boardState.filter(hex => {
            return hex.hasUnit;
        });

        return boardUnits.sort(compareUnitCosts);
    }

    function compareUnitCosts(unit1, unit2) {
        if (unit1.unitCost > unit2.unitCost) {
            return 1;
        }
        if (unit1.unitCost < unit2.unitCost) {
            return -1;
        }
        return unit1.unitName.localeCompare(unit2.unitName);
    };

    return (
        <div>
            {orderedUnits.map(unit => {
                return (
                    <div className="teamcomp-unit-wrapper">
                        <UnitIcon 
                            key={unit.unitId}
                            iconPath={unitIcons[unit.unitId]}
                            name={unit.unitName}
                            cost={unit.unitCost}
                            classNames="unit teamcomp-unit"
                            marginClasses="teamcomp-unit-margins"
                        />
                        <div className="teamcomp-unit-items">
                            {Object.entries(unit.unitItems).map(([itemId, item]) => {
                                return (
                                    <Item 
                                        key={item.id}
                                        iconPath={item.itemIcon}
                                        itemInfo={item}
                                        displayClasses={"teamcomp-unit-items-item"}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>

    );
}

export default TeamCompUnitsList;