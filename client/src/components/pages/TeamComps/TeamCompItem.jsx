import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../shared/context/authContext";
import Modal from "../../../shared/UIElements/Modal";

function TeamCompItem(props) {
    const auth = useContext(AuthContext);

    const [showConfirmModal, updateShowConfirmModal] = useState(false);

    function showDeleteWarning() {
        updateShowConfirmModal(true);
    }

    function cancelDeleteWarning() {
        updateShowConfirmModal(false);
    }

    function confirmDelete() {
        updateShowConfirmModal(false);
        console.log("Deleting team composition");
    }

    return (
        <React.Fragment>
            <Modal 
                show={showConfirmModal}
                onCancel={cancelDeleteWarning}
                header="Are you sure?" 
                footerClass="" 
                footer={
                    <React.Fragment>
                        <button onClick={cancelDeleteWarning}>Cancel</button>
                        <button onClick={confirmDelete}>Delete</button>
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
                    <button>Open in Team Builder</button>
                </Link>
                {auth.isLoggedIn && <Link to={`/${props.userId}/teamcomps`}>
                    <button>{props.userId}</button>
                </Link>}
                {auth.isLoggedIn && <button onClick={showDeleteWarning}>Delete</button>}
            </div>
        </React.Fragment>


    );
}

export default TeamCompItem;