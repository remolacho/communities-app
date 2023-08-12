import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../Auth/authEnterprise";
import {getLang} from "../../Auth/authLang";

export function forgotPasswordService(formData) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/users/forgot_password?lang=${getLang()}`;
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
    return { "forgot_password": {
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
