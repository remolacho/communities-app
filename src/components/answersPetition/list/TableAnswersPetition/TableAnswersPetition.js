import React, {useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faRefresh} from "@fortawesome/free-solid-svg-icons"
import moment from "moment";
import {
    listAnswersPetitionService
} from "../../../../services/answersPetition/ListAnswersPetition/listAnswersPetitionService";

import {toast} from "react-toastify";
import {map} from "lodash";
import {replaceUrlWithLinks} from "../../../../utils/shared";
import Logo from "../../../../assets/jpg/avatar2.jpg";
import "./TableAnswersPetition.scss"
import FilesListArray from "../../../shared/FilesListArray";

export default function TableAnswersPetition(props) {
    const {
        isVisible,
        petition,
        setViewBtnAnswersList,
        reloadTableAnswers,
        setReloadTableAnswers
    } = props;

    const [answers, setAnswers] = useState([])

    useEffect(() => {
        if(!petition?.token || reloadTableAnswers === null) return

        listAnswersPetitionService(petition?.token).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setAnswers(response.data)
            setViewBtnAnswersList(response.data.length > 0)
            if(setReloadTableAnswers) setReloadTableAnswers(null)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })
    }, [petition?.token, reloadTableAnswers]);

    if(!isVisible || !answers.length > 0) return

    const avatarUrl = (user) => {
        return user.avatar_url
            ? user.avatar_url
            : Logo
    }

    return(
        <div className="table-answers-petition">
            <h3>
                <span className="refresh-answers" onClick={()=>{ setReloadTableAnswers(true) }}>
                    <FontAwesomeIcon icon={faRefresh} />
                </span>
                <span>Respuestas ({answers.length})</span>
            </h3>

            <div>
                {
                    map(answers, (answer) => {
                        return <div className="answer" key={answer.id}>
                            <div className="user-info">
                                <Image className="avatar" src={avatarUrl(answer.user)} roundedCircle></Image>
                                {answer.user.name} {answer.user.lastname}
                                <span>{moment(answer.created_at).calendar()}</span>
                            </div>
                            <div className="body-answer"
                                 dangerouslySetInnerHTML={{__html: replaceUrlWithLinks(answer.message)}}/>
                            <div className="body-answer">
                                <FilesListArray files={answer.files}/>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
