import {ENTERPRISE_KEY, ENTERPRISE_LOGO_KEY} from "../../utils/variablesApi"

export function setSubdomainApi(subdomain){
    localStorage.setItem(ENTERPRISE_KEY, subdomain);
}

export function getSubdomainApi() {
    return localStorage.getItem(ENTERPRISE_KEY);
}

export function setLogoEnterpriseApi(logoUrl){
    localStorage.setItem(ENTERPRISE_LOGO_KEY, logoUrl);
}

export function getLogoEnterpriseApi() {
    return localStorage.getItem(ENTERPRISE_LOGO_KEY);
}