import React from "react";

function Header(props) {
    return (
        <div>
            <div className="app-title">
                TFT Team Builder - Set 5.5
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/teamcomps">Team Comps</a>
                <a href="/users">Users</a>
                {/* <a href="/">My Team Comps</a> */}
                <a href="/signin">Sign In / Sign Up / Logout</a>
            </div>
        </div>

    );
}

export default Header;