# Estructura SCSS del Proyecto

## Organización de Archivos

La estructura SCSS del proyecto se encuentra en `src/scss/` y está organizada de la siguiente manera:

### Archivos Principales

- `index.scss`: Archivo principal que importa todos los demás archivos SCSS
- `_tables.scss`: Estilos específicos para tablas
- `_colors.scss`: Variables y configuraciones de colores del proyecto

## Convenciones de Nombrado

- Los archivos parciales comienzan con guión bajo (\_)
- Se usa BEM (Block Element Modifier) para nombrar clases
  ```scss
  .block {
  }
  .block__element {
  }
  .block--modifier {
  }
  ```

## Sistema de Colores

El archivo `_colors.scss` contiene:

- Variables de colores primarios
- Variables de colores secundarios
- Paleta de colores para diferentes estados (éxito, error, advertencia)

## Estructura de Tablas

El archivo `_tables.scss` define:

- Estilos base para tablas
- Modificadores para diferentes tipos de tablas
- Estilos responsivos

## Buenas Prácticas

1. Usar variables SCSS para valores reutilizables
2. Mantener la especificidad baja
3. Organizar los estilos por componentes
4. Usar mixins para código reutilizable
5. Mantener los archivos enfocados en una sola responsabilidad

## Ejemplo de Uso

```scss
// Ejemplo de estructura BEM
.card {
  &__header {
    // Estilos para el header
  }

  &__content {
    // Estilos para el contenido
  }

  &--featured {
    // Estilos para cards destacadas
  }
}
```
