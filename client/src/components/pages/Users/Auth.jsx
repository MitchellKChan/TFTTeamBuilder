import React, { useState, useContext } from "react";

import Card from "../../../shared/UIElements/Card";
import Input from "../../../shared/FormElements/Input";
import { useForm } from "../../../shared/hooks/formHook";
import { AuthContext } from "../../../shared/context/authContext";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/util/validator";
import "./Auth.css";

function Auth() {
    const auth = useContext(AuthContext);
    const [isLoginMode, updateIsLoginMode] = useState(true);

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

        // if (isLoginMode) {
        //     fetch();
        // } else {
        //     try {
        //         const response = await fetch("http://localhost:3001/api/users/signup", {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 username: formState.inputs.username.value,
        //                 email: formState.inputs.email.value,
        //                 password: formState.inputs.password.value
        //             })
        //         });

        //         const responseData = await response.json();
        //     } catch (err) {
        //         console.log(err);
        //     }

        // }

        auth.login();
        console.log(formState.inputs);
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
        <Card className="authentication">
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
    );
}

export default Auth;