import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../shared/context/authContext";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import ErrorModal from "../../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import Modal from "../../../shared/UIElements/Modal";

import "./TeamCompItem.css";

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
            await sendRequest(
                `http://localhost:3001/api/teamComps/${props.id}`, 
                "DELETE",
                null,
                {
                    Authorization: "Bearer " + auth.token
                }
            );
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
            <div className="team-comp-item ml-3 mb-3">
                <h3>{props.compName}</h3>
                {/* <TeamCompItemTraits /> */}
                <ul className="d-inline-block align-middle px-5">
                    {Object.keys(props.traits).map(trait => {
                        return (
                            <li key={trait}>{trait}</li>
                        );
                    }) }
                </ul>
                {/* <TeamCompItemUnits /> */}
                <ul className="d-inline-block align-middle px-5">
                    {Object.keys(props.unitsOnBoard).map(unit => {
                        return (
                            <li key={unit}>{unit}</li>
                        );
                    }) }
                </ul>
                <Link to={`/teambuilder/${props.id}`} className="d-inline-block align-middle px-5">
                    <button className="mr-1 btn btn-secondary btn-sm">Open in Team Builder</button>
                </Link>
                {auth.isLoggedIn && <Link to={`/teamcomps/${props.creator}`} className="d-inline-block align-middle px-5">
                    <button className="mr-1 btn btn-secondary btn-sm">{props.creator}</button>
                </Link>}
                {auth.isLoggedIn && auth.userId === props.userId && <button onClick={showDeleteWarning} className="d-inline-block align-middle px-5">Delete</button>}
            </div>
        </React.Fragment>
    );
}

export default TeamCompItem;