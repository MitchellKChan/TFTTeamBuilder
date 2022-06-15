import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export function useAuth() {
    const [token, updateToken] = useState(false);
    const [userId, updateUserId] = useState(null);
    const [username, updateUsername] = useState(null);
    const [tokenExpirationDate, updateTokenExpirationDate] = useState();

    const login = useCallback((userId, username, token, expirationDate) => {
        updateToken(token);
        updateUserId(userId);
        updateUsername(username);
        const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 10);
        updateTokenExpirationDate(tokenExpiration);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: userId,
                username: username,
                token: token,
                expiration: tokenExpiration.toISOString()
            })
        );
    }, []);
    const logout = useCallback(() => {
        updateToken(null);
        updateUserId(null);
        updateUsername(null);
        updateTokenExpirationDate(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.username, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    return { token, login, logout, userId, username };
}