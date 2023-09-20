import React from "react";
import SignInSignUpLayout from "../../../../layouts/SignInSignUpLayout";
import RecoverPasswordForm from "../../../../components/users/forms/RecoverPasswordForm";
import "./RecoverPassword.scss"

function RecoverPassword(){
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")
    const subdomain = queryParams.get("subdomain")

    return (
        <SignInSignUpLayout>
            <RecoverPasswordForm token={token} subdomain={subdomain}/>
        </SignInSignUpLayout>
    );
}

export default RecoverPassword
