import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";
import {each} from "lodash";

export function updateEnterpriseService(token, dataEnterprise) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/enterprise/update/${token}?lang=${getLang()}`;

    return fetch(url, params(dataEnterprise)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function parse(formData) {
    const enterprise = {
        ...formData,
        email: formData.email.toLowerCase(),
    };

    return enterprise;
}

function params(dataEnterprise) {
    const formData = new FormData();
    const data = parse(dataEnterprise);

    each(data, (value, key) => {
        if(value){
            formData.append(`enterprise[${key}]`, value);
        }
    })

    return {
        method: "PUT",
        headers: {
            Authorization: getTokenApi(),
        },
        body: formData,
    }
}

