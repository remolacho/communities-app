import React, {useRef, useState} from "react";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import classNames from "classnames";
import InputUploadFile from "../../../shared/InputUploadFile";
import {toast} from "react-toastify";
import {createSuggestionService} from "../../../../services/suggestions/Create/createSuggestionService";

import "./CreateSuggestionForm.scss"

const MIN_LENGTH = 10;
const MAX_LENGTH = 500;

function initializer(){
    return  {
        message: "",
        anonymous: "0"
    }
}

function validSendSuggestion(lengthMessage){
    return lengthMessage > MIN_LENGTH && lengthMessage <= MAX_LENGTH
}

export default function CreateSuggestionForm(props) {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState(initializer)
    const [lengthMessage, setLengthMessage] = useState(0)
    const [btnLoading, setBtnLoading] = useState(false)
    const textMessageRef = useRef()

    const onChange = e => {
        if(e.target.name === "message") setLengthMessage(e.target.value.length);

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setBtnLoading(true);

        createSuggestionService(formData, file).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            toast.success(response.message, {theme: "colored"});
            setFormData({...formData, message: ""});
            textMessageRef.current.value = ""
            setLengthMessage(0)
            setFile(null);
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false);
        })
    }

    return(
        <div className="d-flex justify-content-center align-items-center create-suggestion-form">
            <Card>
                <Card.Body>
                    <Card.Title>Crear Sugerencia</Card.Title>
                    <Card.Text>Selecciona la visibilidad de tu perfil ante la administracion</Card.Text>
                    <Form onSubmit={onSubmit} onChange={onChange}>
                        <Form.Group>
                            <Form.Select
                                defaultValue={formData.anonymous}
                                className="mr-sm-2"
                                name="anonymous">
                                <option value="0">Perfil Visible</option>
                                <option value="1">Perfil Anonimo</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                placeholder="Escribe tu sugerencia"
                                type="text"
                                defaultValue={formData.message}
                                name="message"
                                ref={textMessageRef}
                            />
                        </Form.Group>

                        <span className={
                            classNames(  "counter", { "danger": !validSendSuggestion(lengthMessage) } )}>
                            Caracteres: {lengthMessage}
                        </span>
                        <hr/>

                        <InputUploadFile file={file} setFile={setFile}/>

                        <Button variant="primary"
                                type="submit"
                                className="btn-submit"
                                disabled={!validSendSuggestion(lengthMessage) || btnLoading}>
                            {!btnLoading ? "Enviar" : <Spinner animation="border"/> }
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
