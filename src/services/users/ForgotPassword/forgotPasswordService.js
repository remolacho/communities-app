import {API_HOST, V1_API, LANG} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../Auth/authEnterprise";

export function forgotPasswordService(formData) {
    const url = `${API_HOST}/${getSubdomainApi()}/${V1_API}/users/forgot_password?lang=${LANG}`;
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
