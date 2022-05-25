import React from "react";
import { Link } from "react-router-dom";

function UserItem(props) {
    return (
        <div>
            <Link to={`/${props.id}/teamcomps`}>
                <div>
                    <img src={props.image} alt={props.name} />
                </div>
                <div>
                    <h2>{props.name}</h2>
                    <h2>{props.id}</h2>
                    <h3>
                        {props.teamComps.length} {props.teamComps.length === 1 ? "Team Comp" : "Team Comps"}
                    </h3>
                </div>
            </Link>
        </div>

    );
}

export default UserItem;