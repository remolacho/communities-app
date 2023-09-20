import {API_HOST} from "../../utils/variablesApi"
import {getSubdomainApi} from "../auth/authSubdomain";
import {getLang} from "../auth/authLang";
import {getTokenApi} from "../auth/authUser";

export function filesListService(token, type) {
    let url = `${API_HOST}/${getSubdomainApi()}/v1/${type}/files/${token}/list?lang=${getLang()}`;

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
            Authorization: getTokenApi(),
        }
    }
}