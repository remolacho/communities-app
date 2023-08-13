import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../Auth/authSubdomain";
import {getLang} from "../../Auth/authLang";

export function validSubdomainService(subdomain) {
    const url = `${API_HOST}/${subdomain}/v1/enterprise/subdomain`;

    return fetch(url, params).then(response => {
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
        },
    }
}
