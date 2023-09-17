import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";
import {each} from "lodash";

export function createPetitionService(dataPetition, files) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/petition/create?lang=${getLang()}`;

    return fetch(url, params(dataPetition, files)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(dataPetition, files) {
    const formData = new FormData();
    formData.append('petition[category_petition_id]', dataPetition.category_petition_id);
    formData.append('petition[group_role_id]', dataPetition.group_role_id);
    formData.append('petition[title]', dataPetition.title);
    formData.append('petition[message]', dataPetition.message);

    each(files, (file, index) => {
        formData.append(`petition[files[${index}]]`, file);
    })

    return {
        method: "POST",
        headers: {
            Authorization: getTokenApi(),
        },
        body: formData,
    }
}
