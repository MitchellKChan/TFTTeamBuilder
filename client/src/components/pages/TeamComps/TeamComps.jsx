import React from "react";
import { useParams } from "react-router-dom";
import TeamCompsList from "./TeamCompsList";

let STARTER_TEAMCOMPS = [
    {
        id: "0",
        userId: "u1",
        compName: "Only Garen",
        set: "Set5",
        // boardState: genDummyBoard.genDummyBoard(),
        unitsOnBoard: {
            "Garen": 1
        },
        traits: {
            "Set5_Victorious": 1,
            "Set5_Dawnbringer": 1,
            "Set5_Knight": 1
        }
    },
    {
        id: "1",
        userId: "u1",
        compName: "Only Gwen",
        set: "Set5",
        // boardState: genDummyBoard.genDummyBoard(),
        unitsOnBoard: {
            "Gwen": 1
        },
        traits: {
            "Set5_Inanimate": 1,
            "Set5_Mystic": 1,
        }
    },
    {
        id: "2",
        userId: "u2",
        compName: "Only Heimerdinger",
        set: "Set5",
        // boardState: genDummyBoard.genDummyBoard(),
        unitsOnBoard: {
            "Heimerdinger": 1
        },
        traits: {
            "Set5_Draconic": 1,
            "Set5_Renewer": 1,
            "Set5_Caretaker": 1
        }
    }
];

function TeamComps() {
    const { userId } = useParams();
    if (userId) {
        const loadedTeamComps = STARTER_TEAMCOMPS.filter(teamComp => teamComp.userId === userId);

        return (
            <TeamCompsList items={loadedTeamComps}/>
        );
    }
    
    return (
        <TeamCompsList items={STARTER_TEAMCOMPS}/>
    );
}

export default TeamComps;