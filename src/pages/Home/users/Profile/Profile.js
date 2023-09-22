import "./Profile.scss";
import React, {useState, useEffect} from "react";
import MainLayout from "../../../../layouts/MainLayout";
import BannerAvatar from "../../../../components/users/profile/BannerAvatar";
import {profileService} from "../../../../services/users/Profile/profileService";
import {toast} from "react-toastify";
import InfoUser from "../../../../components/users/profile/InfoUser";
import {useParams} from "react-router-dom";
import Loading from "../../../../components/shared/Loading";

export default function Profile(props){
    const {setCallLogin} = props;
    const [profile, setProfile] = useState(null);
    const params = useParams();
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() =>{
        profileService(params.token).then(response => {
            if (!response.success) {
                toast.warning(response.message, {theme: "colored"});
                return null
            }

            setProfile(response.data)
        }).catch(() =>{
            toast.error("Error del servidor", {theme: "colored"});
        }).finally(() =>{
            setLoadingPage(false)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(loadingPage) return (<Loading/>);
    if (!profile) return

    return(
        <MainLayout setCallLogin={setCallLogin} className="profile">
            <div className="profile__title">
               <h2>{profile?.name} {profile?.lastname}</h2>
            </div>

            <BannerAvatar profile={profile} />
            <InfoUser profile={profile} />
        </MainLayout>
    )
}
