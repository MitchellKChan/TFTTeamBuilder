import React from "react";

import "./Home.css";

function Home(props) {
    return (
        <div className="home">
            <div className="welcome px-3">
                <h1>Welcome to TFT Team Builder!</h1>
                <p className="lead">
                    This application is a personal project of mine where you can build and save your own team compositions from 
                    previous Teamfight Tactics sets (currently only Set 5.5 but more will be added later).  All feedback is Welcome!
                </p>
                <p className="lead">
                    <a href="https://github.com/MitchellKChan/TFTTeamBuilder" className="btn btn-lg btn-secondary fw-bold">GitHub repository</a>
                </p>
            </div>
            <img src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blta21e0016ebdc8ea5/60ecebf86554cc2ee3b44f80/072021-TFT-Patch-Notes-11-15-Article-Banner.jpg" className="background" alt="background" />
        </div>

    );
}

export default Home;