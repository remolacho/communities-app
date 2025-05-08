import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";

export function listPropertiesService(status_id, type_id, term, numPage) {
    let url = `${API_HOST}/${getSubdomainApi()}/v1/properties/list?lang=${getLang()}`;

    if(term) url += `&search_attr=location&term=${term}`;
    if(numPage) url += `&page=${numPage}`;
    if(status_id) url += `&status_id=${status_id}`;
    if(type_id) url += `&property_type_id=${type_id}`;

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