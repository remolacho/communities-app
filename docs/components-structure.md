# Estructura de Componentes

## Organización

La estructura de componentes se encuentra en `src/components/` y está organizada de la siguiente manera:

### Componentes Principales

1. **Shared** (`shared/`)

   - Componentes reutilizables en toda la aplicación
   - Botones, inputs, modales, etc.
   - Componentes de UI básicos

2. **SideBar** (`SideBar/`)

   - Componentes relacionados con la navegación lateral
   - Menús y submenús

3. **Peticiones** (`petitions/`, `answersPetition/`)

   - Componentes específicos para el manejo de peticiones
   - Formularios de peticiones
   - Vistas de peticiones

4. **Usuarios** (`users/`)

   - Componentes de gestión de usuarios
   - Perfiles
   - Formularios de usuario

5. **Empresas** (`enterprises/`)

   - Componentes relacionados con empresas
   - Vistas de empresa
   - Formularios de empresa

6. **Sugerencias** (`suggestions/`)
   - Componentes para el sistema de sugerencias

## Estructura Estándar de un Componente

```jsx
// Ejemplo de estructura de componente
import React from "react";
import PropTypes from "prop-types";
import "./ComponentName.scss";

const ComponentName = ({ prop1, prop2 }) => {
  return <div className="component-name">{/* Contenido del componente */}</div>;
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

## Convenciones y Buenas Prácticas

1. **Nombrado de Componentes**

   - PascalCase para nombres de componentes
   - Nombres descriptivos y específicos
   - Sufijo descriptivo según tipo (Form, List, Item, etc.)

2. **Estructura de Archivos**

   ```
   ComponentName/
   ├── ComponentName.js
   ├── ComponentName.scss
   ├── ComponentName.test.js
   └── index.js
   ```

3. **Props**

   - Documentar todas las props
   - Usar PropTypes
   - Definir valores por defecto cuando sea apropiado

4. **Estado**

   - Preferir hooks sobre clases
   - Mantener el estado lo más simple posible
   - Usar Context API para estado global cuando sea necesario

5. **Estilos**
   - Un archivo SCSS por componente
   - Usar BEM para nombrar clases
   - Mantener especificidad baja

## Patrones Comunes

1. **Componentes Contenedores vs Presentacionales**

   ```jsx
   // Contenedor
   const UserListContainer = () => {
     const [users, setUsers] = useState([]);
     // Lógica y llamadas a servicios
     return <UserList users={users} />;
   };

   // Presentacional
   const UserList = ({ users }) => (
     <ul>
       {users.map((user) => (
         <UserItem key={user.id} user={user} />
       ))}
     </ul>
   );
   ```

2. **Composición de Componentes**
   ```jsx
   const Card = ({ header, content, footer }) => (
     <div className="card">
       {header && <div className="card__header">{header}</div>}
       <div className="card__content">{content}</div>
       {footer && <div className="card__footer">{footer}</div>}
     </div>
   );
   ```

## Manejo de Formularios

- Usar formik o react-hook-form para gestión de formularios
- Validación con Yup o similar
- Componentes de campo reutilizables

## Testing

1. **Pruebas Unitarias**

   - Probar renderizado
   - Probar interacciones de usuario
   - Probar props y estados

2. **Pruebas de Integración**
   - Probar flujos completos
   - Probar interacción entre componentes

## Optimización

- Usar React.memo para componentes puros
- Implementar lazy loading cuando sea apropiado
- Optimizar re-renderizados
- Usar keys apropiadamente en listas
