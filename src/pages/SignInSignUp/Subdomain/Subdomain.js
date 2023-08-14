import React from "react";
import SubdomainForm from "../../../components/enterprises/forms/SubdomainForm";
import SignInSignUpLayout from "../../../layouts/SignInSignUpLayout";

function Subdomain(props){
    const {setCallLogin } = props

    return (
        <SignInSignUpLayout>
            <SubdomainForm setCallLogin={setCallLogin} />
        </SignInSignUpLayout>
    );
}

export default Subdomain
