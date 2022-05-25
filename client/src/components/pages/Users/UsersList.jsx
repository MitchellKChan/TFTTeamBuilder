import React from "react";
import UserItem from "./UserItem";

function UsersList(props) {
    if (props.items.length === 0) {
        return (
            <div>
                <p>No users found.</p>
            </div>
        );
    }

    return (
        <div>
            {props.items.map(user => {
                return <UserItem 
                    key={user.id}
                    id={user.id} 
                    name={user.name} 
                    image={user.image}
                    teamComps={user.teamComps}
                />
            })}
        </div>

    );
}

export default UsersList;