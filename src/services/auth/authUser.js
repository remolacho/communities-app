import {ENTERPRISE_KEY, ENTERPRISE_SETTING, JWT} from "../../utils/variablesApi"
import jwtDecode from "jwt-decode";

export function setTokenApi(token){
    localStorage.setItem(JWT, token);
}

export function userLoggedApi(){
    const token = getTokenApi()

    if (!token) return null;

    if (isExpiredToken(token)) return removeJwt();

    return jwtDecode(token);
}

export function getTokenApi() {
    return localStorage.getItem(JWT);
}

export function logoutUser(){
    removeJwt();
    clearCookies();
    return null
}

export function isExpiredToken(token){
    if (!token) return true

    const { exp } = jwtDecode(token);
    const expired = exp * 1000;
    const timeOut = expired - Date.now();

    return timeOut < 0
}

function clearCookies(){
    localStorage.removeItem(ENTERPRISE_KEY);
    localStorage.removeItem(ENTERPRISE_SETTING);
}

function removeJwt(){
    localStorage.removeItem(JWT);
}