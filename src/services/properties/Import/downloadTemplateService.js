import {API_HOST} from "../../../utils/variablesApi"
import {getSubdomainApi} from "../../auth/authSubdomain";
import {getLang} from "../../auth/authLang";
import {getTokenApi} from "../../auth/authUser";

export function downloadPropertiesTemplateService() {
    const url = `${API_HOST}/${getSubdomainApi()}/v1/properties/import/template?lang=${getLang()}`;
    const params = {
        method: "GET",
        headers: {
            Authorization: getTokenApi(),
        },
    };

    return fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al descargar la plantilla');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'plantilla_propiedades.xlsx'; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            return { success: true };
        })
        .catch(() => {
            return { success: false, message: "Error al descargar la plantilla" };
        });
} 