import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";

export function uploadAvatarService(avatarFile) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/users/upload_avatar?lang=${getLang()}`;

    return fetch(url, params(avatarFile)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(avatar) {
    const formData = new FormData();

    formData.append('avatar_file', avatar);

    return {
        method: "POST",
        headers: {
            Authorization: getTokenApi(),
        },
        body: formData,
    }
}
