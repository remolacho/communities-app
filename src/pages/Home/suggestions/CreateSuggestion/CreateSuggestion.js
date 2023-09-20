import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";

import "./CreateSuggestion.scss"
import CreateSuggestionForm from "../../../../components/suggestions/forms/CreateSuggestionForm";

export default function CreateSuggestion(props) {
    const {setCallLogin} = props;

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <CreateSuggestionForm/>
        </BannerLayout>
    )
}
