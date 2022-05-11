import { useEffect, useState } from "react";
import loadTeamBuilder from "../loadTeamBuilder";
import TeamBuilder from "./TeamBuilder";

function App() {
    const TeamBuilderLoading = loadTeamBuilder(TeamBuilder);
    const [appState, updateAppState] = useState({
        isLoading: false,
        error: null,
        startingBoard: null
    });

    useEffect(() => {
        // updateAppState({loading: true});
        // const apiUrl = "http://localhost:3001/api/teamComps/0";
        // fetch(apiUrl).then((res) => res.json()).then((teamCompResponse) => {
        //     updateAppState({loading: false, startingBoard: teamCompResponse.teamComp});
        // });
        async function sendRequest() {
            updateAppState({
                ...appState,
                isLoading: true
            });

            try {
                const response = await fetch("http://localhost:3001/api/teamComps/0");

                const responseData = await response.json();
                updateAppState({
                    ...appState,
                    startingBoard: responseData.teamComp,
                    isLoading: false
                });
            } catch (err) {
                updateAppState({
                    ...appState,
                    isLoading: false,
                    error: err.message
                });
            }

        };
        sendRequest();
    }, []);


    return (
        <div>
            <div className="app-title">
                TFT Team Builder - Set 5.5
            </div>
            <TeamBuilderLoading isLoading={appState.isLoading} startingBoard={appState.startingBoard} />
            {/* <TeamBuilder ></TeamBuilder> */}
        </div>
    );
}

export default App;