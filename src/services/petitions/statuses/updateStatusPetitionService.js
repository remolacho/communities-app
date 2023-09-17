import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";

export function updateStatusPetitionService(token, statusId) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/petition/statuses/update/${token}?lang=${getLang()}`;

    return fetch(url, params(statusId)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(statusId) {
    const petition = { "petition": {
            status_id: statusId,
        }
    };

    return {
        method: "PUT",
        headers: {
            Authorization: getTokenApi(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(petition),
    }
}
