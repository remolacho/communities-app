import React, {useState} from "react";
import {Form, Button, Spinner} from "react-bootstrap";

import {setLogoEnterpriseApi, setSubdomainApi} from "../../../../services/auth/authSubdomain";
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

    const onChange = e => {
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
            setLogoEnterpriseApi(response.data.logo_url)
            setCallLogin(true)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false);
        })
    }

    return (
        <>
            <h2><center>Iniciar con el dominio de tu comunidad</center></h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
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
        </>
    )
}
