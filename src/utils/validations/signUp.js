import {size, values} from "lodash";

let result = {
    isValid: false,
    message: "",
}

export function validFormSignUp(data){
    result.isValid = false;

    if (!isValidFields(data)){
        result.message = "Todos los campos son obligatorios";
        return result;
    }

    if(!isIdentifierValid(data)){
        result.message = "La cedula debe ser numerica entre 4 y 15 caracteres positivos";
        return result;
    }

    if (!isEmailValid(data)){
        result.message = "El correo es invalido";
        return result;
    }

    if(!isReferenceValid(data)){
        result.message = "El referencia debe tener esta estructura T4-P11-A1102, las letras de inicio Son T-P-A. Respetar guiones y mayusculas esto hace referencia a la ubuicacion del apartamento";
        return result;
    }

    if(!isPhoneValid(data)){
        result.message = "El telefono debe tener esta estructura 3174131178, minimo 8 digitos maximo 15";
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

function isIdentifierValid(data) {
    const minDigits = 4;
    const maxDigits = 15;
    const identifierValid = /^\d[0-9]+$/;
    return identifierValid.test(String(data.identifier)) &&
        data.identifier.length >= minDigits &&
        data.identifier.length <= maxDigits
}

function isEmailValid(data) {
    const pattern = /^([a-zA-Z0-9.])+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return pattern.test(String(data.email).toLowerCase())
}

function isReferenceValid(data) {
    const pattern = /^(T[0-4]-P(0?[0-9]|1[0-6])-A([0-8]{1,4}|1608))$/
    return pattern.test(String(data.reference))
}

function isPhoneValid(data) {
    const minDigits = 8;
    const maxDigits = 15;
    const pattern = /^\d[0-9]+$/;
    return pattern.test(String(data.phone)) && data.phone.length >= minDigits && data.phone.length <= maxDigits
}

function isValidPassword(data) {
    return data.password === data.password_confirmation
}

function isValidLenPassword(data){
    return data.password.length >= 6
}