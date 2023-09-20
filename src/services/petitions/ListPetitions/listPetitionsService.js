import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";

export function listPetitionsService(type, categoryId, statusId, numPage) {
    let url = `${API_HOST}/${getSubdomainApi()}/v1/petition/${type}?lang=${getLang()}`;

    if(categoryId) url += `&category_petition_id=${categoryId}`;
    if(statusId) url += `&status_id=${statusId}`;
    if(numPage) url += `&page=${numPage}`;

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