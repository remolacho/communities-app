import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";

import Logo from "../../../../assets/png/logo2.png";

import "./SubdomainForm.scss"
import {setSubdomainApi} from "../../../../services/Auth/authEnterprise";
import {toast} from "react-toastify";
import {SUBDOMAIN} from "../../../../utils/variablesApi";

function initialAttributes(){
    return {
        subdomain: "",
    }
}

export default function SubdomainForm(props){
    const { setCallLogin } = props;
    const [formData, setFormData] = useState(initialAttributes())

    const onChance = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();

        if(formData.subdomain !== SUBDOMAIN){
            toast.error("Subdominio Invalido", {theme: "colored"});
            return
        }

        setSubdomainApi(formData.subdomain)
        setCallLogin(true)
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

                <Button variant="primary" type="submit">
                    Iniciar
                </Button>
            </Form>
        </div>
    )
}
