import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import DetailSuggestionComponent from "../../../../components/suggestions/DetailSuggestionComponent";
import {useParams} from "react-router-dom";

import "./DetailSuggestion.scss"

export default function DetailSuggestion(props) {
    const {setCallLogin} = props;
    const params = useParams();

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <DetailSuggestionComponent token={params.token}/>
        </BannerLayout>
    )
}
