import React, {useState} from "react";
import {Form, Button, Spinner, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import {validFormSignIn} from "../../../../utils/validations/signIn"
import {signInService} from "../../../../services/users/SignIn/signInService";
import {setTokenApi} from "../../../../services/Auth/authUser"

import Logo from "../../../../assets/png/logo2.png";

import "./SignInForm.scss"

function initialLoginAttributes(){
    return {
        email: "",
        password: ""
    }
}

export default function SignInForm(props){
    const { setCallLogin } = props;
    const [formData, setFormData] = useState(initialLoginAttributes())
    const [btnLoading, setBtnLoading] = useState(false)

    const onChance = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();

        const signInValidation = validFormSignIn(formData);

        if(!signInValidation.isValid){
            toast.warning(signInValidation.message, {theme: "colored"});
            return
        }

        setBtnLoading(true)

        signInService(formData).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setTokenApi(response.data.jwt);
            toast.success("Inicio exitoso", {theme: "colored"});
            setFormData(initialLoginAttributes);
            setCallLogin(true);
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false);
        })
    }

    return (
        <div className="sign-in-form">

            <h2><center><img src={Logo} alt="Communities"/></center></h2>
            <Form onSubmit={onSubmit} onChange={onChance}>
                <Form.Group>
                    <Form.Control type="email"
                                  placeholder="Email"
                                  defaultValue={formData.email}
                                  name="email"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control type="password"
                                  placeholder="Contraseña"
                                  defaultValue={formData.password}
                                  name="password"/>
                </Form.Group>

                <Button variant="primary" type="submit"  disabled={btnLoading}>
                    {!btnLoading ? "Iniciar sesion" : <Spinner animation="border"/> }
                </Button>
            </Form>

            <Row>
                <Col>
                    <Link to="/users/forgot-password">Olvide mi contraseña</Link>
                </Col>
                <Col>
                    <Link to="/users/sign-up">Registrarse</Link>
                </Col>
            </Row>
        </div>
    )
}
