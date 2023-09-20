import {API_HOST} from "../../../utils/variablesApi"
import {getLang} from "../../auth/authLang";

export function changePasswordService(formData, subdomain, token) {
    const url = `${API_HOST}/${subdomain}/v1/users/forgot_password/change/${token}?lang=${getLang()}`;

    return fetch(url, params(formData)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(data) {
    const body = {
        forgot_password: {
            ...data
        }
    }

    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }
}
