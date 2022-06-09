import React, { useState, useContext } from "react";

import Card from "../../../shared/UIElements/Card";
import Input from "../../../shared/FormElements/Input";
import { useForm } from "../../../shared/hooks/formHook";
import { AuthContext } from "../../../shared/context/authContext";
import { useHttpClient } from "../../../shared/hooks/httpHook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/util/validator";
import "./Auth.css";
import ErrorModal from "../../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/UIElements/LoadingSpinner";

function Auth() {
    const auth = useContext(AuthContext);
    const [isLoginMode, updateIsLoginMode] = useState(true);
    const { isLoading, errorMessage, sendRequest, clearErrorMessage } = useHttpClient();

    const [formState, updateFormState, setFormData] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false);

    async function authSubmitHandler(event) {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest( // build/runtime variable later on, not hard-coded to local server
                    "http://localhost:3001/api/users/login", // should use https later on
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value // SSL certificates for sensitive info
                    }),
                    { "Content-Type": "application/json" }
                );
                auth.login(responseData.userId, responseData.username, responseData.token);
            } catch (err) {
                // error handling is done in sendRequest
            }
        } else {
            try {
                const responseData = await sendRequest(
                    "http://localhost:3001/api/users/signup",
                    "POST",
                    JSON.stringify({
                        username: formState.inputs.username.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    { "Content-Type": "application/json" }
                );
                auth.login(responseData.userId, responseData.username, responseData.token);
            } catch (err) {
                // error handling is done in sendRequest
            }
        }
        
    }

    function switchModeHandler() {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                username: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                username: {
                    value: "",
                    isValid: false
                }
            }, false);
        }
        updateIsLoginMode(prevMode => !prevMode);
    }

    return (
        <React.Fragment>
            <ErrorModal error={errorMessage} onClear={clearErrorMessage} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr/>
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input 
                            element="input"
                            id="username"
                            type="text"
                            label="Username"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter your username."
                            onInput={updateFormState}
                        />
                    )}
                    <Input 
                        element="input"
                        id="email"
                        type="email"
                        label="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={updateFormState}
                    />
                    <Input 
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText="Please enter a valid password with at least 8 characters."
                        onInput={updateFormState}
                    />
                    <button type="submit" disabled={!formState.isValid}>{isLoginMode ? "Login" : "Signup"}</button>
                </form>
                <button onClick={switchModeHandler}>Switch to {isLoginMode ? "Signup" : "Login"}</button>
            </Card>
        </React.Fragment>
    );
}

export default Auth;