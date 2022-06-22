import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../shared/context/authContext";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import ErrorModal from "../../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";
import Modal from "../../../shared/UIElements/Modal";
import Traits from "../../Traits";
import TeamCompUnitsList from "./TeamCompUnitsList";

import "./TeamComp.css";
import Card from "../../../shared/UIElements/Card";

function TeamComp(props) {
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
            <Card>
                <div className="team-comp-name-section d-inline-block align-middle">
                    <div>{props.compName}</div>
                    {auth.isLoggedIn && 
                        <div>by <Link to={`/teamcomps/${props.creator}`} className="">
                                {props.creator}
                            </Link>
                        </div>
                    }
                </div>
                <div className="team-comp-traits-section d-inline-block align-middle">
                    <Traits activeTraits={props.traits} teamCompDisplay classNames="d-inline-block align-middle" />
                </div>
                <div className="team-comp-units-section d-inline-block align-middle">
                    <TeamCompUnitsList boardState={props.boardState} />
                </div>
                <div className="team-comp-button-wrapper d-inline-block align-middle">
                    <Link to={`/teambuilder/${props.id}`}>
                        <button className="team-comp-button btn btn-secondary btn-sm">Open in Team Builder</button>
                    </Link>
                    {auth.isLoggedIn && auth.userId === props.userId && 
                        <button onClick={showDeleteWarning} className="team-comp-button btn btn-outline-danger btn-sm">
                            Delete
                        </button>
                    }
                </div>

            </Card>
        </React.Fragment>
    );
}

export default TeamComp;