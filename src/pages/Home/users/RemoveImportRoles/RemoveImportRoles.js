import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import RemoveBulkRoles from "../../../../components/users/roles/RemoveBulkRoles";

import "./RemoveImportRoles.scss"

export default function RemoveImportRoles(props) {
    const {setCallLogin} = props;

    return(
        <BannerLayout setCallLogin={setCallLogin}>
           <RemoveBulkRoles/>
        </BannerLayout>
    )
}
