import React, {useRef, useState} from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import "./AnswerForm.scss"
import InputUploadFile from "../../../shared/InputUploadFile";
import classNames from "classnames";
import {toast} from "react-toastify";
import {createAnswerPetitionService} from "../../../../services/answersPetition/Create/createAnswerPetitionService";
import TableAnswersPetition from "../../list/TableAnswersPetition";

const MIN_LENGTH = 10;
const MAX_LENGTH = 500;

function initializer(){
    return  {
        message: "",
    }
}

function validSendPQR(lengthMessage){
    return lengthMessage > MIN_LENGTH && lengthMessage <= MAX_LENGTH
}

export default function AnswerForm(props) {
    const {petition} = props
    const [formData, setFormData] = useState(initializer)
    const [btnLoading, setBtnLoading] = useState(false)
    const [file, setFile] = useState(null);
    const [lengthMessage, setLengthMessage] = useState(0)
    const [viewAnswers, setViewAnswers] = useState(true)
    const [viewBtnAnswersList, setViewBtnAnswersList] = useState(false)
    const [reloadTableAnswers, setReloadTableAnswers] = useState(false)
    const textMessageRef = useRef()

    const onChange = e => {
        if(e.target.name === "message") setLengthMessage(e.target.value.length);

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setBtnLoading(true);

        let files = []
        if(file) files.push(file)

        createAnswerPetitionService(petition.token, formData, files).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setFormData({...formData, message: ""});
            textMessageRef.current.value = ""
            setLengthMessage(0)
            setFile(null);
            setReloadTableAnswers(true)
            files = []
            toast.success(response.message, {theme: "colored"});
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setBtnLoading(false);
        })
    }

    return(
        <div className="answer-form">
            <TableAnswersPetition
                petition={petition}
                isVisible={viewAnswers}
                setViewBtnAnswersList={setViewBtnAnswersList}
                setReloadTableAnswers={setReloadTableAnswers}
                reloadTableAnswers={reloadTableAnswers}
            />

            <Form onChange={onChange} onSubmit={onSubmit}>
                {
                    petition?.setting?.reply?.action &&
                    <div className="">
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                placeholder="Escribe tu respuesta"
                                type="text"
                                name="message"
                                ref={textMessageRef}
                            />
                        </Form.Group>

                        <span className={
                            classNames("counter", {"danger": !validSendPQR(lengthMessage)})}>
                                        Caracteres: {lengthMessage}
                        </span>

                        <InputUploadFile file={file} setFile={setFile}/>

                        <hr/>
                    </div>
                }

                {
                    petition?.setting?.reply?.action &&
                    <Button variant="primary"
                         type="submit"
                         className="btn-submit"
                         disabled={!validSendPQR(lengthMessage) || btnLoading}>
                         {!btnLoading ? "Responder" : <Spinner animation="border"/>}
                    </Button>
                }

                {
                    viewBtnAnswersList &&
                    <Button variant="secondary" className="btn-answer" onClick={()=>setViewAnswers(!viewAnswers)}>
                        {!viewAnswers ? "Ver respuestas" : "Ocultar respuestas" }
                    </Button>
                }
            </Form>
        </div>
    )
}
