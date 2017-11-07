# Google Analytics

**Estructura:** Categoría, Acción, Etiqueta.

## Categorías

- **Error:** Errores del lado del cliente.
- **Node:** Errores del lado del servidor.
- **users:** Logs relacionados con los usuarios.
- **events:** Logs relacionados con los eventos.
- **bookings:** Logs relacionados con las reservas.

## Acciones

- **Error:**
    - **Http Error:** Logs relacionados con errores Http.
    - **Security Error:** Logs relacionados con errores Http 401 y 419.
    - **Unhandled Errors:** Logs relacionados con errores no capturados en el lado del cliente. La acción se corresponde con el nombre del error.
- **Node:**
    - **Server Error:** Logs relacionados con fallos en el servidor que se devolverán como errores HTTP al cliente.
    - **Error:** Logs relacionados con errores no capturados del lado del servidor.

## Etiquetas

Las etiquetas se corresponden con distinta información dependiendo del contexto.