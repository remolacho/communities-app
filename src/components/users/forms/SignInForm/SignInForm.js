import React, {useState} from "react";
import {Form, Button, Spinner, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import {validFormSignIn} from "../../../../utils/validations/signIn"
import {signInService} from "../../../../services/users/SignIn/signInService";
import {setTokenApi} from "../../../../services/auth/authUser"
import {getSubdomainApi} from "../../../../services/auth/authSubdomain";

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

    const onChange = e => {
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
            <Form onSubmit={onSubmit} onChange={onChange}>
                <h2><center>Iniciar sesión {getSubdomainApi()}</center></h2>

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

                <Row>
                    <Col>
                        <Link to="/users/forgot-password">Olvide mi contraseña</Link>
                    </Col>
                    <Col>
                        <Link to="/users/sign-up">Registrarse</Link>
                    </Col>
                </Row>
            </Form>
    )
}
