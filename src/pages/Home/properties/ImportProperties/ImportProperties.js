import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import ImportBulkProperties from "../../../../components/properties/importBulkProperties";
import "./ImportProperties.scss"

export default function ImportProperties(props) {
    const {setCallLogin} = props;

    return(
        <BannerLayout setCallLogin={setCallLogin}>
           <ImportBulkProperties/>
        </BannerLayout>
    )
} 