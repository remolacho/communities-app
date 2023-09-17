import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";
import {each} from "lodash";

export function createAnswerPetitionService(token, dataAnswer, files) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/petition/answer/${token}/create?lang=${getLang()}`;

    return fetch(url, params(dataAnswer, files)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(dataPetition, files) {
    const formData = new FormData();
    formData.append('answer[message]', dataPetition.message);

    each(files, (file, index) => {
        formData.append(`answer[files[${index}]]`, file);
    })

    return {
        method: "POST",
        headers: {
            Authorization: getTokenApi(),
        },
        body: formData,
    }
}
