import {API_HOST} from "../../../utils/variablesApi"

export function verifierChangePasswordService(token, subdomain) {
    const url = `${API_HOST}/${subdomain}/v1/users/forgot_password/verifier/${token}`;

    return fetch(url, params()).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params() {
    return {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }
}
