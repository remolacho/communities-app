import {size, values} from "lodash";

let result = {
    isValid: false,
    message: "",
}

export function recoverPassword(data){
    result.isValid = false;

    if (!isValidFields(data)){
        result.message = "Todos los campos son obligatorios";
        return result;
    }


    if (!isValidPassword(data)){
        result.message = "Las contraseñas son distintas";
        return result;
    }

    if (!isValidLenPassword(data)){
        result.message = "La contraseña debe tener minimo 6 caracteres";
        return result;
    }

    result.isValid = true
    return result;
}

function isValidFields(data){
    let validCount = 0;
    let sizeFields = size(data);

    values(data).some(value => {
        value && validCount++
        return null
    });

    return validCount === sizeFields
}

function isValidPassword(data) {
    return data.password === data.password_confirmation
}

function isValidLenPassword(data){
    return data.password.length >= 6
}