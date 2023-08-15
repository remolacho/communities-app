import {LANG_KEY} from "../../utils/variablesApi"

export function setLang(lang){
    localStorage.setItem(LANG_KEY, lang);
}

export function getLang() {
    return localStorage.getItem(LANG_KEY);
}
