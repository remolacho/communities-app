import React, {useEffect, useState} from "react";
import BannerLayout from "../../../../layouts/BannerLayout";
import CreatePetitionForm from "../../../../components/petitions/forms/CreatePetitionForm";
import {toast} from "react-toastify";

import {
    listCategoriesPetitionsServices
} from "../../../../services/categoriesPetitions/list/listCategoriesPetitionsService";

import {
    listGroupRolesPetitionsService
} from "../../../../services/groupRolesPetitions/List/listGroupRolesPetitionsService";

import "./CreatePetition.scss"
import Loading from "../../../../components/shared/Loading";

export default function CreatePetition(props) {
    const {setCallLogin} = props;
    const [categories, setCategories] = useState([])
    const [groupRoles, setGroupRoles] = useState([])
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() =>{
        listCategoriesPetitionsServices().then(response => {
            if (!response.success) {
                toast.error(response.message, {theme: "colored"});
                return null
            }

            setCategories(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })

        listGroupRolesPetitionsService().then(response => {
            if (!response.success) {
                toast.error(response.message, {theme: "colored"});
                return null
            }

            setGroupRoles(response.data)
            setLoadingPage(false)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        })
    },[])

    if(loadingPage) return (<Loading/>);

    return(
        <BannerLayout setCallLogin={setCallLogin}>
            <CreatePetitionForm categories={categories} groupRoles={groupRoles} />
        </BannerLayout>
    )
}
