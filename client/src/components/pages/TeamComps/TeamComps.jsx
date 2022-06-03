import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import ErrorModal from "../../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import TeamCompsList from "./TeamCompsList";

function TeamComps() {
    const { isLoading, errorMessage, sendRequest, clearErrorMessage } = useHttpClient();
    const [loadedTeamComps, updateLoadedTeamComps] = useState();

    const { userId } = useParams();

    useEffect(() => {
        async function fetchTeamComps() {
            const userTeamComps = userId ? `/user/${userId}` : "";
            try {
                const responseData = await sendRequest("http://localhost:3001/api/teamComps" + userTeamComps);

                updateLoadedTeamComps(responseData.teamComps);
            } catch (err) {
                // error handling is done in sendRequest
            }  
        };
        fetchTeamComps();
    }, [sendRequest, userId]);

    function teamCompDeleteHandler(deletedTeamCompId) {
        updateLoadedTeamComps(prevTeamComps => 
            prevTeamComps.filter(teamComp => teamComp.id !== deletedTeamCompId)
        );
    }
    
    return (
        <React.Fragment>
            <ErrorModal error={errorMessage} onClear={clearErrorMessage} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedTeamComps && <TeamCompsList items={loadedTeamComps} onDeleteTeamComp={teamCompDeleteHandler} />}
        </React.Fragment>
        
    );
}

export default TeamComps;