import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import FilesList from "../../shared/FilesList";
import {detailPetitionsService} from "../../../services/petitions/Detail/detailPetitionsService";
import {toast} from "react-toastify";
import ChangeStatusPetition from "../ChangeStatusPetition";
import moment from "moment";
import location from "moment/locale/es"
import AnswerForm from "../../answersPetition/forms/AnswerForm";

import "./DetailPetitionComponent.scss"

export default function DetailPetitionComponent(props) {
    const { token } = props
    const [petition, setPetition] = useState(null)
    const [statusId, setStatusId] = useState(null)

    const navigate = useNavigate();

    useEffect(() =>{
        detailPetitionsService(token).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setPetition(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })
    },[token, statusId])

    return(
        <div className="d-flex justify-content-center align-items-center detail-petition-component">
            <Card>
                <Card.Body>
                    <Card.Title>
                        PQR {petition?.ticket}
                    </Card.Title>

                    <ChangeStatusPetition
                        petition={petition}
                        setStatusId={setStatusId}
                    />

                    <div className="petition-user">
                        Creado Por {petition?.user?.name} {petition?.user?.lastname} {petition?.user?.reference}
                    </div>

                    <div className="petition-date">
                        Creado el { moment(petition?.created_at).locale("es", location).format("LL") },
                        Ultima modificación { moment(petition?.updated_at).calendar() }
                    </div>

                    <Card.Text>{petition?.title}</Card.Text>

                    <div className="petition-message">
                        {petition?.message}
                    </div>

                    <FilesList type="petition" token={token} />

                    <hr/>

                    <AnswerForm petition={petition}/>
                </Card.Body>
                <Card.Footer className="d-flex">
                    <Button onClick={() => navigate(-1)} style={{marginLeft: "auto"}}>
                        Volver
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}
