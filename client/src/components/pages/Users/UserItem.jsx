import React from "react";
import { Link } from "react-router-dom";
import Card from "../../../shared/UIElements/Card";

import "./UserItem.css";

function UserItem(props) {
    return (
        <div className="mt-3">
            <Link to={`/${props.id}/teamcomps`}>
                <Card className="mb-2 user-item">
                    <h3>{props.username}</h3>
                    <h5>
                        {props.teamComps.length} {props.teamComps.length === 1 ? "Team Comp" : "Team Comps"}
                    </h5>
                </Card>
            </Link>
        </div>

    );
}

export default UserItem;