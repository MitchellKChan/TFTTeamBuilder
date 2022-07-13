import React, { useState } from "react";

function DisplayButtonsList(props) {

    return (
        <div className="mb-md-2">
            {props.displayTypesList.map(displayType => {
                const isTypeSelected = props.selectedDisplay === displayType ? "btn-secondary" : "btn-outline-secondary";
                return (
                    <button
                        type="button"
                        className={"me-1 btn btn-sm " + isTypeSelected}
                        onClick={props.selectDisplayType}
                    >
                        {displayType}
                    </button>
                );
            })}
        </div>
    );

}

export default DisplayButtonsList;