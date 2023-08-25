import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";
import {each} from "lodash";

export function updateEnterpriseService(token, dataEnterprise, logoFile, bannerFile) {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/enterprise/update/${token}?lang=${getLang()}`;

    return fetch(url, params(dataEnterprise, logoFile, bannerFile)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function parse(formData) {
    return {
        ...formData,
        email: formData.email.toLowerCase(),
    };
}

function params(dataEnterprise, logoFile, bannerFile) {
    const formData = new FormData();
    const data = parse(dataEnterprise);

    each(data, (value, key) => {
        if(value){
            formData.append(`enterprise[${key}]`, value);
        }
    })

    if(logoFile){
        formData.append("enterprise[logo]", logoFile);
    }

    if(bannerFile){
        formData.append("enterprise[banner]", bannerFile);
    }

    return {
        method: "PUT",
        headers: {
            Authorization: getTokenApi(),
        },
        body: formData,
    }
}

