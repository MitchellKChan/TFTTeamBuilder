import React from "react";
import UsersList from "./UsersList";

let STARTER_USERS = [
    {
        id: "u1",
        name: "Luffy",
        image: "https://i1.sndcdn.com/artworks-000056070659-e98l6i-t240x240.jpg",
        teamComps: ["0"]
    }
];

function Users(props) {

    return (
        <UsersList items={STARTER_USERS} />
    );
}

export default Users;