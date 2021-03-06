import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import TeamComps from "./components/pages/TeamComps/TeamComps";
import Users from "./components/pages/Users/Users";
import MainNavigation from "./shared/Navigation/MainNavigation";
import Auth from "./components/pages/Users/Auth";
import { AuthContext } from "./shared/context/authContext";
import TeamBuilderLoader from "./components/pages/TeamBuilder/TeamBuilderLoader";
import { useAuth } from "./shared/hooks/authHook";

function App() {
    const { token, login, logout, userId, username } = useAuth();

    let routes;

    if (token) {
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
                <Route path="/teamcomps/:creator" 
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
        <AuthContext.Provider 
            value={{ 
                isLoggedIn: !!token, 
                token: token,
                username: username,
                userId: userId, 
                login: login, 
                logout: logout 
            }}
        >
            <BrowserRouter>
                <MainNavigation />
                <main>{routes}</main>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;