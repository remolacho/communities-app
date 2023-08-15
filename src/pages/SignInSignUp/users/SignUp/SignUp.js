import React from "react";
import SignUpForm from "../../../../components/users/forms/SignUpForm";
import SignInSignUpLayout from "../../../../layouts/SignInSignUpLayout";

import "./SignUp.scss"

function SignUp(){
    return (
        <SignInSignUpLayout>
            <SignUpForm/>
        </SignInSignUpLayout>
    );
}

export default SignUp
