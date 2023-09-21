/* eslint-disable */

export function uniqueTimestamp(){
    return  Date.now();
}

export function replaceUrlWithLinks(text) {
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text?.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}
