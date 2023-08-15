import React from "react";
import SignInForm from "../../../../components/users/forms/SignInForm";
import SignInSignUpLayout from "../../../../layouts/SignInSignUpLayout";

import "./Login.scss"

function Login(props){
    const {setCallLogin } = props

    return (
        <SignInSignUpLayout>
            <SignInForm setCallLogin={setCallLogin}/>
        </SignInSignUpLayout>
    );
}

export default Login
