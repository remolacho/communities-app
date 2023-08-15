import React, {useState, useCallback} from "react";
import AvatarAlt from "../../../../assets/jpg/avatar2.jpg";
import BannerAlt from "../../../../assets/png/banner.png";
import { useDropzone } from "react-dropzone"
import { CameraIcon } from "../../../../utils/icons"
import {Button, Spinner} from "react-bootstrap";
import useAuth from "../../../../hooks/contextValues/useAuth";
import {uploadAvatarService} from "../../../../services/users/UploadAvatar/uploadAvatarService";
import {toast} from "react-toastify";

import "./BannerAvatar.scss"

export default function BannerAvatar(props){
    const { profile } = props;
    const [btnLoading, setBtnLoading] = useState(false)
    const {currentEnterprise} = useAuth()
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(
        profile?.avatar_url ?  profile.avatar_url : AvatarAlt
    );

    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    }, [])

    const { getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps } = useDropzone({
        accept: {'image/*': ['.jpeg', '.png']},
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar
    })

    const bannerUrl = currentEnterprise?.banner_url
        ? currentEnterprise.banner_url
        : BannerAlt

    const onSubmit = async () =>{
        if(avatarFile){
            setBtnLoading(true)

            await uploadAvatarService(avatarFile).then(response => {
                if (!response.success) {
                    toast.warning(response.message, {theme: "colored"});
                    return null
                }

                toast.success(response.message, {theme: "colored"});
            }).catch(() =>{
                toast.error("Error del servidor", {theme: "colored"});
            }).finally(() =>{
            })
        }

        setBtnLoading(false)
    }

    return(
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className="avatar"
                 style={{ backgroundImage: `url('${avatarUrl}')`}}
                 {...getRootAvatarProps()} >

                <input {...getInputAvatarProps()} />
                <CameraIcon/>
            </div>
            <div className="actions-profile">
                <Button onClick={onSubmit}> {!btnLoading ? "Actualizar" : <Spinner animation="border"/> }</Button>
            </div>
        </div>
    )
}
