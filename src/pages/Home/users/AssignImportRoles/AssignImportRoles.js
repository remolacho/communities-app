import React from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import AssignBulkRoles from "../../../../components/users/roles/AssignBulkRoles/AssignBulkRoles";

import "./AssignImportRoles.scss"

export default function AssignImportRoles(props) {
    const {setCallLogin} = props;

    return(
        <BannerLayout setCallLogin={setCallLogin}>
           <AssignBulkRoles/>
        </BannerLayout>
    )
}
