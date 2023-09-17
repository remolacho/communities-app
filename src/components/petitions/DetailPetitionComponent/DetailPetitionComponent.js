import React, {useEffect, useState} from "react";
import {Button, Card, Dropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import FilesList from "../../shared/FilesList";
import {detailPetitionsService} from "../../../services/petitions/Detail/detailPetitionsService";
import {toast} from "react-toastify";
import "./DetailPetitionComponent.scss"
import ChangeStatusPetition from "../ChangeStatusPetition";

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
                        <span style={{
                            background: petition?.status.color,
                            borderRadius: "25px",
                            padding: "5px 5px 5px 5px",
                            fontSize: "16px",
                            color: "black",
                            fontWeight: "bold",
                            marginLeft: 10}}
                        >
                            {petition?.status.name}
                        </span>
                    </Card.Title>

                    <Card.Text>{petition?.title}</Card.Text>

                    <ChangeStatusPetition
                        petition={petition}
                        setStatusId={setStatusId}
                    />

                    <div className="petition-message">
                        {petition?.message}
                    </div>

                    <FilesList type="petition" token={token} />
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
