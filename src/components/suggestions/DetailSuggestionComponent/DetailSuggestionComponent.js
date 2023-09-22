import "./DetailSuggestionComponent.scss"
import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import {toast} from "react-toastify";
import {detailSuggestionsService} from "../../../services/suggestions/Detail/detailSuggestionsService";
import {useNavigate} from "react-router-dom";
import FilesList from "../../shared/FilesList";
import Loading from "../../shared/Loading";

export default function DetailSuggestionComponent(props) {
    const { token } = props
    const [suggestion, setSuggestion] = useState(null)
    const navigate = useNavigate();
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() =>{
        detailSuggestionsService(token).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setSuggestion(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setLoadingPage(false)
        })
    },[token])

    if(loadingPage) return (<Loading/>);

    return(
        <div className="d-flex justify-content-center align-items-center detail-suggestion-component">
            <Card>
                <Card.Body>
                    <Card.Title>Sugerencia</Card.Title>
                    <Card.Text>Ticket: {suggestion?.ticket}</Card.Text>
                    <div className="suggestion-message">
                        {suggestion?.message}
                    </div>
                    <FilesList type="suggestion" token={token} />
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
