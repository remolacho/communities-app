import React, {useState, useEffect} from "react";
import MainLayout from "../../../../layouts/MainLayout";
import {toast} from "react-toastify";
import {profileEnterpriseService} from "../../../../services/enterprises/Enterprise/profileEnterpriseService";

import "./Edit.scss";
import EditEnterpriseForm from "../../../../components/enterprises/forms/EditEnterpriseForm";

export default function Edit(props){
    const {setCallLogin} = props;
    const [enterprise, setEnterprise] = useState(null);

    useEffect(() =>{
        profileEnterpriseService().then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setEnterprise(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
        })
    },[])

    if (!enterprise) return

    return(
        <MainLayout setCallLogin={setCallLogin} className="edit-enterprise">
            <div className="edit-enterprise__title">
                <h2>
                    {enterprise.name}
                </h2>
            </div>

            <EditEnterpriseForm enterprise={enterprise}/>
        </MainLayout>
    )
}
