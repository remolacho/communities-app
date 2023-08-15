import {ENTERPRISE_SETTING} from "../../utils/variablesApi"
import {settingEnterpriseService} from "../enterprises/Enterprise/settingEnterpriseService";
import {userLoggedApi} from "./authUser";

export function enterpriseApi(){
    if(!userLoggedApi() || getEnterprise()){
        return null
    }

    settingEnterpriseService().then(response => {
        if (!response.success) {
            return null
        }

        setEnterprise(response.data.token)
    }).catch(() =>{
        return null
    })
}

function setEnterprise(token){
    localStorage.setItem(ENTERPRISE_SETTING, token);
}

function getEnterprise() {
    return localStorage.getItem(ENTERPRISE_SETTING);
}
