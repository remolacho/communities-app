import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";
import {each} from "lodash";

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

    each(dataSuggestion, (value, key) => {
        if(value){
            formData.append(`suggestion[${key}]`, value);
        }
    })

    if(file){
        console.log("jjjjjjjjjjjj", file)
        formData.append("suggestion[files[0]]", file);
    }

    return {
        method: "POST",
        headers: {
            Authorization: getTokenApi(),
        },
        body: formData,
    }
}
