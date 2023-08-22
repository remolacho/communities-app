import React, {useState, useCallback} from "react";
import { Form, Button, Row, Col, Spinner } from  "react-bootstrap";

import "./EditEnterpriseForm.scss"
import {profileEnterpriseService} from "../../../../services/enterprises/Enterprise/profileEnterpriseService";
import {toast} from "react-toastify";
import {updateEnterpriseService} from "../../../../services/enterprises/Enterprise/updateEnterpriseService";

function attributes(){
    return  {
        name: "",
        rut:  "",
        email: "",
        address:  "",
        logo: null,
        banner: null
    }
}

function initializer(enterprise){
    let enterpriseAttributes = attributes();

    if (!enterprise) return enterpriseAttributes;

    enterpriseAttributes.name = enterprise.name
    enterpriseAttributes.rut = enterprise.rut
    enterpriseAttributes.email = enterprise.email
    enterpriseAttributes.address = enterprise.address

    return enterpriseAttributes
}

export default function EditEnterpriseForm(props){
    const { enterprise } = props;
    const [formData, setFormData] = useState(initializer(enterprise));
    const [btnLoading, setBtnLoading] = useState(false)

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) =>{
        e.preventDefault();

        setBtnLoading(true)

        updateEnterpriseService(enterprise.token, formData).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false)
        })
    }

    return(
        <div className="edit-enterprise-form">
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                defaultValue={formData.rut}
                                type="text"
                                placeholder="RUT"
                                name="rut"
                                onChange={onChange}
                            />
                        </Col>

                        <Col>
                            <Form.Control
                                defaultValue={formData.name}
                                type="text"
                                placeholder="Nombre"
                                name="name"
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        defaultValue={formData.email}
                        placeholder="Email"
                        type="text"
                        name="email"
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        defaultValue={formData.address}
                        as="textarea"
                        row="5"
                        placeholder="Direccion"
                        type="text"
                        name="address"
                        onChange={onChange}
                    />
                </Form.Group>

                <Button variant="primary"
                        type="submit"
                        className="btn-submit"
                        disabled={btnLoading}>
                    {!btnLoading ? "Guardar" : <Spinner animation="border"/> }
                </Button>
            </Form>
        </div>
    )
}
