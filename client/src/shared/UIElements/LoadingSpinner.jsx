import React from "react";

import "./LoadingSpinner.css";

function LoadingSpinner(props) {
    return (
        <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
            <div className="spinner-border text-light" role="status"></div>
        </div>
    );
}

export default LoadingSpinner;