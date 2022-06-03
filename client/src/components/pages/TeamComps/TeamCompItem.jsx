import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../shared/context/authContext";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import ErrorModal from "../../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import Modal from "../../../shared/UIElements/Modal";

function TeamCompItem(props) {
    const auth = useContext(AuthContext);
    const { isLoading, errorMessage, sendRequest, clearErrorMessage } = useHttpClient();

    const [showConfirmModal, updateShowConfirmModal] = useState(false);

    function showDeleteWarning() {
        updateShowConfirmModal(true);
    }

    function cancelDeleteWarning() {
        updateShowConfirmModal(false);
    }

    async function confirmDeleteHandler() {
        updateShowConfirmModal(false);
        try {
            await sendRequest(`http://localhost:3001/api/teamComps/${props.id}`, "DELETE");
            props.onDelete(props.id);
        } catch (err) {
            // error handling is done in sendRequest
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={errorMessage} onClear={clearErrorMessage} />
            {isLoading && <LoadingSpinner asOverlay />}
            <Modal 
                show={showConfirmModal}
                onCancel={cancelDeleteWarning}
                header="Are you sure?" 
                footerClass="" 
                footer={
                    <React.Fragment>
                        <button onClick={cancelDeleteWarning}>Cancel</button>
                        <button onClick={confirmDeleteHandler}>Delete</button>
                    </React.Fragment>
                }

            >
                <p>Do you want to proceed and delete this team composition?  This cannot be undone once confirmed.</p>
            </Modal>
            <div>
                Team Composition {props.compName}
                {/* <TeamCompItemTraits /> */}
                <ul>
                    {Object.keys(props.traits).map(trait => {
                        return (
                            <li>{trait}</li>
                        );
                    }) }
                </ul>
                {/* <TeamCompItemUnits /> */}
                <ul>
                    {Object.keys(props.unitsOnBoard).map(unit => {
                        return (
                            <li>{unit}</li>
                        );
                    }) }
                </ul>
                <Link to={`/teambuilder/${props.id}`}>
                    <button className="mr-1 btn btn-secondary btn-sm">Open in Team Builder</button>
                </Link>
                {auth.isLoggedIn && <Link to={`/teamcomps/${props.userId}`}>
                    <button className="mr-1 btn btn-secondary btn-sm">{props.userId}</button>
                </Link>}
                {auth.isLoggedIn && auth.userId === props.userId && <button onClick={showDeleteWarning}>Delete</button>}
            </div>
        </React.Fragment>
    );
}

export default TeamCompItem;