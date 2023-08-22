import React, {useState, useEffect} from "react";
import MainLayout from "../../../../layouts/MainLayout";
import {toast} from "react-toastify";
import {profileEnterpriseService} from "../../../../services/enterprises/Enterprise/profileEnterpriseService";
import BannerLogo from "../../../../components/enterprises/profile/BannerLogo";
import InfoEnterprise from "../../../../components/enterprises/profile/InfoEnterprise";

import "./Profile.scss";

export default function Profile(props){
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
        <MainLayout setCallLogin={setCallLogin} className="profile-enterprise">
            <div className="profile-enterprise__title">
                <h2>
                    {enterprise.name}
                </h2>
            </div>

            <BannerLogo enterprise={enterprise} />
            <InfoEnterprise enterprise={enterprise} />
        </MainLayout>
    )
}
