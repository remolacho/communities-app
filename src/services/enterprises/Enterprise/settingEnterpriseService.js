import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../Auth/authSubdomain";
import {getLang} from "../../Auth/authLang";
import {getTokenApi} from "../../Auth/authUser";

export function settingEnterpriseService() {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/enterprise/setting?lang=${getLang()}`;

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
