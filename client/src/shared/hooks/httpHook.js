import { useCallback, useEffect, useRef, useState } from "react";

export function useHttpClient() {
    const [isLoading, updateIsLoading] = useState(false);
    const [errorMessage, updateErrorMessage] = useState();

    const activeHttpRequests = useRef([]); // does not reset when component re-renders

    const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        updateIsLoading(true);
        const httpAbortCtrll = new AbortController(); // cancels request in case component doesn't need to be rendered
        activeHttpRequests.current.push(httpAbortCtrll); 

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal
            });
    
            const responseData = await response.json();

            // remove request's Abort Controller if the request completed
            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrll
            );
    
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            updateIsLoading(false);
            return responseData;
        } catch (err) {
            updateIsLoading(false);
            updateErrorMessage(err.message);
            throw err;
        }
        
    }, []);

    function clearErrorMessage() {
        updateErrorMessage(null);
    }

    // makes sure requests that are on the way out do not continue if switching away from component that triggered request
    useEffect(() => {
        return () => { // executed as a clean up function the next time component using this hook unmounts
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, errorMessage, sendRequest, clearErrorMessage };
};