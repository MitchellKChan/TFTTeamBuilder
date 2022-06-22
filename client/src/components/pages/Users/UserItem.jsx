import React from "react";
import { Link } from "react-router-dom";
import Card from "../../../shared/UIElements/Card";

import "./UserItem.css";

function UserItem(props) {
    return (
        <div className="user-item">
            <Link to={`/teamcomps/${props.username}`}>
                <Card>
                    <div className="d-inline-block">{props.username}</div>
                    <div className="d-inline-block team-comp-count">
                        {props.teamComps.length} {props.teamComps.length === 1 ? "Team Composition" : "Team Compositions"}
                    </div>
                </Card>
            </Link>
        </div>

    );
}

export default UserItem;