import React from "react";

import Modal from "./Modal";

function ErrorModal(props) {
    return (
        <Modal
            onCancel={props.onClear}
            header="An Error Occurred"
            headerClass="error__modal__header"
            show={!!props.error}
            footer={<button onClick={props.onClear}>Okay</button>}
        >
            <p>{props.error}</p>
        </Modal>
    );
}

export default ErrorModal;