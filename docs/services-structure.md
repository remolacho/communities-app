# Estructura de Servicios

## Organización

La estructura de servicios se encuentra en `src/services/` y está organizada por dominios funcionales relacionados con la gestión de comunidades residenciales:

### Servicios Principales

1. **Auth** (`auth/`)

   - Autenticación de residentes, administradores y personal de la comunidad
   - Manejo de sesiones y permisos según el rol en la comunidad

2. **PQRs** (`petitions/`, `answersPetition/`)

   - Gestión de Peticiones, Quejas y Reclamos de la comunidad
   - Sistema de seguimiento y respuesta a PQRs
   - Notificaciones y actualizaciones de estado

3. **Usuarios** (`users/`, `usersRoles/`)

   - Gestión de perfiles de residentes
   - Administración de roles (administrador, residente, vigilante, etc.)
   - Gestión de información de contacto y unidades residenciales

4. **Comunidades** (`enterprises/`)

   - Gestión de información de la comunidad residencial
   - Configuración de características específicas del conjunto
   - Administración de torres, bloques o sectores

5. **Categorías** (`categoriesPetitions/`)

   - Clasificación de PQRs por tipo (mantenimiento, seguridad, convivencia, etc.)
   - Gestión de categorías personalizadas según necesidades de la comunidad

6. **Sugerencias** (`suggestions/`)

   - Sistema de sugerencias para mejoras en la comunidad
   - Buzón de ideas y propuestas de los residentes

7. **Archivos** (`FilesList/`)

   - Gestión de documentos de la comunidad
   - Almacenamiento de evidencias para PQRs
   - Manejo de archivos administrativos

8. **Roles de Grupo** (`groupRolesPetitions/`)
   - Gestión de permisos por área o función en la comunidad
   - Configuración de accesos a funcionalidades específicas

## Estructura Estándar de un Servicio

Cada servicio sigue una estructura común:

```javascript
// Ejemplo de estructura de servicio
export const nombreServicio = async (params) => {
  try {
    // Lógica del servicio
    const response = await api.method("/endpoint", params);
    return response.data;
  } catch (error) {
    // Manejo de errores
    throw error;
  }
};
```

## Convenciones y Buenas Prácticas

1. **Nombrado de Servicios**

   - Usar nombres descriptivos
   - Sufijo `Service` para archivos de servicio
   - Ejemplo: `createUserService.js`

2. **Manejo de Errores**

   - Usar try/catch en todas las operaciones asíncronas
   - Propagar errores con información relevante
   - Mantener consistencia en el formato de respuesta

3. **Organización de Archivos**

   - Un servicio por archivo
   - Agrupar servicios relacionados en directorios
   - Mantener la lógica de negocio separada de la lógica de API

4. **Documentación**
   - Documentar parámetros esperados
   - Documentar respuestas esperadas
   - Incluir ejemplos de uso cuando sea necesario

## Ejemplo de Implementación

```javascript
// src/services/users/createUserService.js
import api from "../api";

/**
 * Crea un nuevo usuario en el sistema
 * @param {Object} userData - Datos del usuario
 * @returns {Promise<Object>} Usuario creado
 */
export const createUserService = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear usuario: " + error.message);
  }
};
```

## Integración con API

- Uso consistente de interceptores
- Manejo centralizado de tokens
- Transformación de datos consistente
- Manejo de respuestas estandarizado

## Testing

- Cada servicio debe tener sus pruebas unitarias
- Usar mocks para llamadas a API
- Probar casos de éxito y error
- Mantener cobertura de código alta
