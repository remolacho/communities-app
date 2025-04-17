import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import ImportBulkCategories from "../../../../components/fines/importBulkCategories";

export default function ImportFineCategories(props) {
    const {setCallLogin} = props;

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <ImportBulkCategories />
        </BannerLayout>
    )
}