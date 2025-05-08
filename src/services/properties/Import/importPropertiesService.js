import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";

export function importPropertiesService(file) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/properties/import/create?lang=${getLang()}`;
    return fetch(url, params(file)).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(file) {
    const formData = new FormData();

    formData.append('property_import_file', file);

    return {
        method: "POST",
        headers: {
            Authorization: getTokenApi(),
        },
        body: formData,
    }
} 