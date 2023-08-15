import React, {useState} from "react";
import {Form, Button, Spinner, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import {validFormSignUp} from "../../../../utils/validations/signUp"
import { useNavigate } from 'react-router-dom';
import {signUpService} from "../../../../services/users/SignUp/signUpService";

function initialAttributes(){
    return {
        email: "",
        name: "",
        lastname: "",
        identifier: "",
        reference: "",
        phone: "",
        password: "",
        password_confirmation: ""
    }
}

export default function SignUpForm(){
    const [formData, setFormData] = useState(initialAttributes())
    const [btnLoading, setBtnLoading] = useState(false)
    const navigate = useNavigate()

    const onChance = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();

        const signUpValidation = validFormSignUp(formData);

        if (!signUpValidation.isValid){
            toast.error(signUpValidation.message, {theme: "colored"});
            return
        }

        setBtnLoading(true)

        signUpService(formData).then(response => {
            if (!response.success) {
                toast.error(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
            setFormData(initialAttributes);

            navigate('/')
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false);
        })
    }

    return (
        <>
            <h2><center>Crear cuenta</center></h2>
            <Form onSubmit={onSubmit} onChange={onChance}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Cedula Ejm 1110603675"
                        defaultValue={formData.identifier}
                        name="identifier"
                    />
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                defaultValue={formData.name}
                                name="name"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                                defaultValue={formData.lastname}
                                name="lastname"
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        defaultValue={formData.email}
                        name="email"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Referencia Ejm T4-P11-A1102"
                        defaultValue={formData.reference}
                        name="reference"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Telefono Ejm 3174176981"
                        defaultValue={formData.phone}
                        name="phone"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        defaultValue={formData.password}
                        name="password"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Repetir Contraseña"
                        defaultValue={formData.password_confirmation}
                        name="password_confirmation"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={btnLoading}>
                    {!btnLoading ? "Registrarse" : <Spinner animation="border"/> }
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
