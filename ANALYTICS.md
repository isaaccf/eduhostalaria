# Google Analytics

> To Do: revisar cliente...

**Estructura:** Categoría, Acción, Etiqueta.

## Categorías

- **Error:** Errores del lado del cliente.
- **users:** Logs relacionados con los usuarios.
- **events:** Logs relacionados con los eventos.
- **bookings:** Logs relacionados con las reservas.
- **Server:** Logs del lado del servidor.

## Acciones

- **Error:**
  - **Http Error:** Logs relacionados con errores Http.
  - **Security Error:** Logs relacionados con errores Http 401 y 419.
  - **Unhandled Errors:** Logs relacionados con errores no capturados en el lado del cliente. La acción se corresponde con el nombre del error.
- **Server:**
  - **rest_status:** Capturados por código se devolverán como errores HTTP
  - **express_status:** Capturados por middleware se devolverán como errores HTTP
  - **uncaughtException:** NO Capturados
  - **unhandledRejection:** NO Capturados

## Etiquetas

Las etiquetas se corresponden con distinta información dependiendo del contexto.
