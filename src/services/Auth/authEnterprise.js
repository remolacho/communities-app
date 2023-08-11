import {ENTERPRISE_KEY} from "../../utils/variablesApi"

export function setSubdomainApi(subdomain){
    localStorage.setItem(ENTERPRISE_KEY, subdomain);
}

export function getSubdomainApi() {
    return localStorage.getItem(ENTERPRISE_KEY);
}