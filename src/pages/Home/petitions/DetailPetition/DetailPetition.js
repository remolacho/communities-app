import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import {useParams} from "react-router-dom";
import DetailPetitionComponent from "../../../../components/petitions/DetailPetitionComponent";

import "./DetailPetition.scss"

export default function DetailPetition(props) {
    const {setCallLogin} = props;
    const params = useParams();

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <DetailPetitionComponent token={params.token}/>
        </BannerLayout>
    )
}
