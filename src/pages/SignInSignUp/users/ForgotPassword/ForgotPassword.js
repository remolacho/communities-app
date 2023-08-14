import React from "react";
import SignInSignUpLayout from "../../../../layouts/SignInSignUpLayout";
import ForgotPasswordForm from "../../../../components/users/forms/ForgotPasswordForm";

import "./ForgotPassword.scss"

function ForgotPassword(){
    return (
        <SignInSignUpLayout>
            <ForgotPasswordForm/>
        </SignInSignUpLayout>
    );
}

export default ForgotPassword
