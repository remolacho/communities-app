import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";

export function createSuggestionService(dataSuggestion, file) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/suggestion/create?lang=${getLang()}`;

    return fetch(url, params(dataSuggestion, file)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(dataSuggestion, file) {
    const formData = new FormData();

    formData.append('suggestion[message]', dataSuggestion.message);
    formData.append('suggestion[anonymous]', dataSuggestion.anonymous);
    if(file) formData.append('suggestion[files][0]', file);

    return {
        method: "POST",
        headers: {
            Authorization: getTokenApi(),
        },
        body: formData,
    }
}
