import React, { useEffect, useState } from "react";
import ErrorModal from "../../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import UsersList from "./UsersList";
import { useHttpClient } from "../../../shared/hooks/httpHook";

function Users(props) {
    const { isLoading, errorMessage, sendRequest, clearErrorMessage } = useHttpClient();
    const [loadedUsers, updateLoadedUsers] = useState();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const responseData = await sendRequest("http://localhost:3001/api/users");

                updateLoadedUsers(responseData.users);
            } catch (err) {
                // error handling is done in sendRequest
            }  
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={errorMessage} onClear={clearErrorMessage}/>
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    );
}

export default Users;