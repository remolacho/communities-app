import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getTokenApi} from "../../auth/authUser";

export function deletePropertyService(propertyId) {
    let url = `${API_HOST}/${getSubdomainApi()}/v1/properties/delete/${propertyId}`;

    return fetch(url, params()).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params() {
    return {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: getTokenApi(),
        }
    }
} 