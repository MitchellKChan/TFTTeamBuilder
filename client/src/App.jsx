import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import loadTeamBuilder from "./loadTeamBuilder";
import TeamBuilder from "./components/TeamBuilder";
import Home from "./components/pages/Home";
import TeamComps from "./components/pages/TeamComps/TeamComps";
import Users from "./components/pages/Users/Users";
import MainNavigation from "./shared/Navigation/MainNavigation";
import Auth from "./components/pages/Users/Auth";
import { AuthContext } from "./shared/context/authContext";
import TeamBuilderLoader from "./components/pages/TeamBuilder/TeamBuilderLoader";

function App() {

    const [isLoggedIn, updateIsLoggedIn] = useState(false);
    const [userId, updateUserId] = useState(null);
    const login = useCallback((userId) => {
        updateIsLoggedIn(true);
        updateUserId(userId);
    }, []);
    const logout = useCallback(() => {
        updateIsLoggedIn(false);
        updateUserId(null);
    }, []);



    const TeamBuilderLoading = loadTeamBuilder(TeamBuilder);
    const [appState, updateAppState] = useState({
        isLoading: true,
        error: null,
        startingBoard: null
    });

    useEffect(() => {
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
                <Route path="/teamcomps/:userId" 
                        element={ <TeamComps /> } 
                />
                <Route path="/teambuilder" exact 
                    element={ <TeamBuilderLoader /> } 
                />
                <Route path="/teambuilder/:teamCompId" 
                    element={ <TeamBuilderLoader /> } 
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
                    element={ <TeamBuilderLoader /> } 
                />
                <Route path="/teambuilder/:teamCompId" 
                    element={ <TeamBuilderLoader /> } 
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
        <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}>
            <BrowserRouter>
                <MainNavigation />
                <main>{routes}</main>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;