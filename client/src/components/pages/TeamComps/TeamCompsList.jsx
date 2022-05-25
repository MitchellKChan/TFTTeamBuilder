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
        <div>
            {props.items.map(teamComp => {
                return <TeamCompItem 
                    key={teamComp.id}
                    id={teamComp.id} 
                    userId={teamComp.userId} 
                    compName={teamComp.compName} 
                    set={teamComp.set}
                    boardState={teamComp.boardState} 
                    unitsOnBoard={teamComp.unitsOnBoard} 
                    traits={teamComp.traits} 
                />
            })}
        </div>

    );
}

export default TeamCompsList;