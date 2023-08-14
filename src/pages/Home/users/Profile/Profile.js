import React, {useState, useEffect} from "react";
import "./Profile.scss";
import MainLayout from "../../../../layouts/MainLayout";

export default function Profile(props){
    const {callLogin, setCallLogin} = props;

    useEffect(() =>{
    }, [callLogin])

    return(
        <MainLayout setCallLogin={setCallLogin} className="profile">
            <div className="profile__title">
               <h2>Jonathan Rojas</h2>
            </div>
        </MainLayout>
    )
}
