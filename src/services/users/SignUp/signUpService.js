import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../Auth/authSubdomain";
import {getLang} from "../../Auth/authLang";

export function signUpService(formData) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/users/sign_up?lang=${getLang()}`;
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
    return { "sign_up": {
            ...formData,
            email: formData.email.toLowerCase(),
        }
    };
}

function params(user) {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    }
}
