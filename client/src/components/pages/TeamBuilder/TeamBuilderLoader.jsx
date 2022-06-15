import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import ErrorModal from "../../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import TeamBuilder from "./TeamBuilder";

function TeamBuilderLoader() {
    const { isLoading, errorMessage, sendRequest, clearErrorMessage } = useHttpClient();
    const [loadedTeamComp, updateLoadedTeamComp] = useState();

    const { teamCompId } = useParams();

    useEffect(() => {
        async function fillTeamBuilder() {
            const id = teamCompId ? teamCompId : "0";
            try {
                const responseData = await sendRequest("http://localhost:3001/api/teamComps/" + id);
                updateLoadedTeamComp(responseData.teamComp);
                
            } catch (err) {
                // error handling is done in sendRequest
            }
        };
        fillTeamBuilder()
    }, [sendRequest, teamCompId]);

    return (
        <React.Fragment>
            <ErrorModal error={errorMessage} onClear={clearErrorMessage} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedTeamComp && <TeamBuilder loadedTeamComp={loadedTeamComp} teamCompId={teamCompId} />}
        </React.Fragment>
    );
}

export default TeamBuilderLoader;