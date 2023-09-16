import React, {useRef, useState} from "react";
import {Button, Card, Form, Spinner} from 'react-bootstrap';
import {map} from "lodash";
import classNames from "classnames";
import InputUploadFile from "../../../shared/InputUploadFile";

import {toast} from "react-toastify";
import {createPetitionService} from "../../../../services/petitions/Create/createPetitionService";

import "./CreatePetitionForm.scss"

const MIN_LENGTH = 10;
const MAX_LENGTH = 500;

function initializer(){
    return  {
        category_petition_id: null,
        group_role_id: null,
        title: "",
        message: "",
    }
}

function validSendPQR(lengthMessage){
    return lengthMessage > MIN_LENGTH && lengthMessage <= MAX_LENGTH
}

export default function CreatePetitionForm(props) {
    const {categories, groupRoles} = props
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [lengthMessage, setLengthMessage] = useState(0)
    const [formData, setFormData] = useState(initializer)
    const [btnLoading, setBtnLoading] = useState(false)
    const texTitleRef = useRef()
    const textMessageRef = useRef()

    const onChange = e => {
        if(e.target.name === "message") setLengthMessage(e.target.value.length);

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setBtnLoading(true);

        let files = []
        if(file1) files.push(file1)
        if(file2) files.push(file2)

        createPetitionService(formData, files).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
            setFormData({...formData, message: "", title: ""});
            textMessageRef.current.value = ""
            texTitleRef.current.value = ""
            setLengthMessage(0)
            setFile1(null);
            setFile2(null);
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false);
        })
    }

    return(
        <div className="d-flex justify-content-center align-items-center create-petition-form">
            <Card>
                <Card.Body>
                    <Card.Title>Crear PQR</Card.Title>
                    <Form onSubmit={onSubmit} onChange={onChange}>
                        <div className="create-petition-form__content">
                            <Form.Group>
                                <Form.Label>Tipo de PQR</Form.Label>

                                <Form.Select
                                    defaultValue={formData.category_petition_id}
                                    className="mr-sm-2"
                                    name="category_petition_id">
                                    <option key={0} value={null}>Seleccionar una opción...</option>
                                    {
                                        map(categories, (category) => {
                                            return <option key={category.id} value={category.id}>{category.name}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Alcance que deseas</Form.Label>

                                <Form.Select
                                    defaultValue={formData.group_role_id}
                                    className="mr-sm-2"
                                    name="group_role_id">
                                    <option key={0} value={null}>Seleccionar una opción...</option>
                                    {
                                        map(groupRoles, (groupRole) => {
                                            return <option key={groupRole.id} value={groupRole.id}>{groupRole.name}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="create-petition-form__content">
                            <Form.Group>
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control
                                    placeholder="Escribe tu titulo"
                                    type="text"
                                    defaultValue={formData.title}
                                    name="title"
                                    ref={texTitleRef}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Mensaje</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    placeholder="Escribe tu mensaje"
                                    type="text"
                                    defaultValue={formData.message}
                                    name="message"
                                    ref={textMessageRef}
                                />

                                <span className={
                                    classNames(  "counter", { "danger": !validSendPQR(lengthMessage) } )}>
                                    Caracteres: {lengthMessage}
                                </span>
                                <hr/>
                            </Form.Group>
                        </div>

                        <InputUploadFile file={file1} setFile={setFile1}/>
                        <InputUploadFile file={file2} setFile={setFile2}/>

                        <Button variant="primary"
                                type="submit"
                                className="btn-submit"
                                disabled={!validSendPQR(lengthMessage) || btnLoading}>
                            {!btnLoading ? "Enviar" : <Spinner animation="border"/> }
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
