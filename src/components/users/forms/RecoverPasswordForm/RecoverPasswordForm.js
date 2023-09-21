import React, {useEffect, useState} from "react";
import {verifierChangePasswordService} from "../../../../services/users/RecoverPassword/verifierChangePasswordService";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {recoverPassword} from "../../../../utils/validations/recoverPassword";
import {changePasswordService} from "../../../../services/users/RecoverPassword/changePasswordService";
import "./RecoverPasswordForm.scss"

function initializer(){
    return {
        password: "",
        password_confirmation: ""
    }
}

export default function RecoverPasswordForm(props){
    const {token, subdomain} = props
    const [formData, setFormData] = useState(initializer())
    const [isValid, setIsValid] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        verifierChangePasswordService(token, subdomain).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setIsValid(true)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!isValid) return;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();

        const formValidation = recoverPassword(formData);

        if (!formValidation.isValid){
            toast.error(formValidation.message, {theme: "colored"});
            return
        }

        setBtnLoading(true)

        changePasswordService(formData, subdomain, token).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setIsValid(true)
            navigate("/")
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false)
        })
    }

    return (
       <div>
           <Form onSubmit={onSubmit} onChange={onChange}>
               <h3><center>Nueva contraseña</center></h3>

               <Form.Group>
                   <Form.Control type="password"
                                 placeholder="Contraseña"
                                 defaultValue={formData.password}
                                 name="password"/>
               </Form.Group>

               <Form.Group>
                   <Form.Control type="password"
                                 placeholder="Confirmar Contraseña"
                                 defaultValue={formData.password_confirmation}
                                 name="password_confirmation"/>
               </Form.Group>

               <Button variant="primary" type="submit"  disabled={btnLoading}>
                   {!btnLoading ? "Enviar" : <Spinner animation="border"/> }
               </Button>

               <Row>
                   <Col>
                       <Link to="/users/login">Iniciar</Link>
                   </Col>
                   <Col>
                       <Link to="/users/sign-up">Registrarse</Link>
                   </Col>
               </Row>
           </Form>
       </div>
    );
}