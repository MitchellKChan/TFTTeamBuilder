import React from "react";
import { Link } from "react-router-dom";

function UserItem(props) {
    return (
        <div>
            <Link to={`/${props.id}/teamcomps`}>
                <div>
                    <h2>{props.username}</h2>
                    <h3>
                        {props.teamComps.length} {props.teamComps.length === 1 ? "Team Comp" : "Team Comps"}
                    </h3>
                </div>
            </Link>
        </div>

    );
}

export default UserItem;