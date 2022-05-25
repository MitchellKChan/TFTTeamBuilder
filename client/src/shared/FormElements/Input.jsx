import React, { useEffect, useReducer } from "react";
import { validate } from "../util/validator";

import "./Input.css";

function inputReducer(state, action) {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
}

function Input(props) {
    const [inputState, updateInputState] = useReducer(inputReducer, {
        value: "", 
        isTouched: false,
        isValid: false
    });

    useEffect(() => {
        props.onInput(props.id, inputState.value, inputState.isValid)
    }, [props.id, inputState.value, inputState.isValid, props.onInput]);

    function changeHandler(event) {
        updateInputState({
            type: "CHANGE", 
            val: event.target.value,
            validators: props.validators
        });
    }

    function touchHandler() {
        updateInputState({
            type: "TOUCH"
        });
    }

    const element = props.element === "input" ? (
        <input 
            id={props.id} 
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />
    ) : (
        <textarea 
            id={props.id} 
            rows={props.rows || 3} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />
    );

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid"}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;