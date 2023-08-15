import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";

export function signInService(formData) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/users/sign_in?lang=${getLang()}`;
    const user = parseUser(formData);

    return fetch(url, params(user)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function parseUser(formData) {
    return { "sign_in": {
            ...formData,
            email: formData.email.toLowerCase(),
        }
    };
}

function params(user) {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
}
