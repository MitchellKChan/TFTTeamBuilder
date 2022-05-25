import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Navigate, Routes , Redirect} from "react-router-dom";
import loadTeamBuilder from "./loadTeamBuilder";
import TeamBuilder from "./components/TeamBuilder";
import Home from "./components/pages/Home";
import TeamComps from "./components/pages/TeamComps/TeamComps";
import Users from "./components/pages/Users/Users";
import MainNavigation from "./shared/Navigation/MainNavigation";
import Auth from "./components/pages/Users/Auth";
import { AuthContext } from "./shared/context/authContext";

function App() {

    const [isLoggedIn, updateIsLoggedIn] = useState(false);
    const login = useCallback(() => {
        updateIsLoggedIn(true);
    }, []);
    const logout = useCallback(() => {
        updateIsLoggedIn(false);
    }, []);



    const TeamBuilderLoading = loadTeamBuilder(TeamBuilder);
    const [appState, updateAppState] = useState({
        isLoading: true,
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


    let routes;

    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/" exact 
                    element={ <Home /> } 
                />
                <Route path="/users" 
                    element={ <Users /> } 
                />
                <Route path="/teamcomps" 
                    element={ <TeamComps /> } 
                />
                <Route path="/:userId/teamcomps" 
                        element={ <TeamComps /> } 
                />
                <Route path="/teambuilder" exact 
                    element={ <TeamBuilderLoading isLoading={appState.isLoading} startingBoard={appState.startingBoard} /> } 
                />
                <Route path="*" 
                    element={ <Navigate replace to="/" /> } 
                />
            </Routes>
        );
    } else {
        routes = (
            <Routes>
                <Route path="/" exact 
                    element={ <Home /> } 
                />
                <Route path="/users" 
                    element={ <Users /> } 
                />
                <Route path="/teamcomps" 
                    element={ <TeamComps /> } 
                />
                <Route path="/teambuilder" exact 
                    element={ <TeamBuilderLoading isLoading={appState.isLoading} startingBoard={appState.startingBoard} /> } 
                />
                <Route path="/auth" 
                    element={ <Auth /> } 
                />
                <Route path="*" 
                    element={ <Navigate replace to="/auth" /> } 
                />
            </Routes>
        );
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
            <BrowserRouter>
                <MainNavigation />
                <main>{routes}</main>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;