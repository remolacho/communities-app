import React, {useState} from "react";
import {Form, Button, Spinner, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import {validFormForgot} from "../../../../utils/validations/forgotPassword"
import {forgotPasswordService} from "../../../../services/users/ForgotPassword/forgotPasswordService";

import "./ForgotPasswordForm.scss"

function initialAttributes(){
    return {
        email: "",
    }
}

export default function ForgotPasswordForm(){
    const [formData, setFormData] = useState(initialAttributes())
    const [btnLoading, setBtnLoading] = useState(false)

    const onChance = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();

        const signInValidation = validFormForgot(formData);

        if(!signInValidation.isValid){
            toast.warning(signInValidation.message, {theme: "colored"});
            return
        }

        setBtnLoading(true)

        forgotPasswordService(formData).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
            setFormData(initialAttributes);
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false);
        })
    }

    return (
        <>
            <h2><center>¿Olvido su contraseña?</center></h2>
            <Form onSubmit={onSubmit} onChange={onChance}>
                <Form.Group>
                    <Form.Control type="email"
                                  placeholder="Email"
                                  defaultValue={formData.email}
                                  name="email"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={btnLoading}>
                    {!btnLoading ? "Enviar" : <Spinner animation="border"/> }
                </Button>
            </Form>

            <Row>
                <Col>
                    <Link to="/">Volver</Link>
                </Col>
            </Row>
        </>
    )
}
