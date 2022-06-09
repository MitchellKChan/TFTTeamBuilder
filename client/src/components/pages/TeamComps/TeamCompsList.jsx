import React from "react";
import TeamCompItem from "./TeamCompItem";

function TeamCompsList(props) {
    if (props.items.length === 0) {
        return (
            <div>
                <p>No team compositions found.</p>
            </div>
        );
    }

    return (
        <div className="mt-3">
            {props.items.map(teamComp => {
                return <TeamCompItem 
                    key={teamComp._id}
                    id={teamComp._id} 
                    userId={teamComp.userId} 
                    creator={teamComp.creator}
                    compName={teamComp.compName} 
                    set={teamComp.set}
                    boardState={teamComp.boardState} 
                    unitsOnBoard={teamComp.unitsOnBoard} 
                    traits={teamComp.traits} 
                    onDelete={props.onDeleteTeamComp}
                />
            })}
        </div>

    );
}

export default TeamCompsList;