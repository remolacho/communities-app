import React, {useState} from "react";
import {Form, Button, Spinner} from "react-bootstrap";

import Logo from "../../../../assets/png/logo2.png";

import "./SubdomainForm.scss"
import {setSubdomainApi} from "../../../../services/Auth/authSubdomain";
import {toast} from "react-toastify";
import {SUBDOMAIN} from "../../../../utils/variablesApi";
import {validSubdomainService} from "../../../../services/enterprises/Subdomain/validSubdomainService";

function initialAttributes(){
    return {
        subdomain: "",
    }
}

export default function SubdomainForm(props){
    const { setCallLogin } = props;
    const [formData, setFormData] = useState(initialAttributes())
    const [btnLoading, setBtnLoading] = useState(false)

    const onChance = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();

        setBtnLoading(true)

        validSubdomainService(formData.subdomain).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
            setSubdomainApi(formData.subdomain)
            setCallLogin(true)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false);
        })
    }

    return (
        <div className="subdomain-form">

            <h2><center><img src={Logo} alt="Communities"/></center></h2>
            <h2><center>Iniciar con el dominio de tu comunidad</center></h2>
            <Form onSubmit={onSubmit} onChange={onChance}>
                <Form.Group>
                    <Form.Control type="text"
                                  placeholder={SUBDOMAIN}
                                  defaultValue={formData.subdomain}
                                  name="subdomain"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={btnLoading}>
                    {!btnLoading ? "Iniciar" : <Spinner animation="border"/> }
                </Button>
            </Form>
        </div>
    )
}
