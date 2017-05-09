# Servidor reserva-escola
Reservas para Escolas de Hostelaría


# Prerequisites
* Node 7.6 or better.

> Note: Node with support for async/await.

# Install dependencies
```bash
$npm install
```

# Start server
```bash
$npm run reload 
```
> Note: Auto refresh when changes files on src
```bash
$npm run start
```

# Project Structure
```bash
server
|-- src
|    |-- modules
|    |   |-- application: 'Main module'
|    |          |-- application.module.ts: 'The main module to start all modules'
|    |   |-- users: 'Content users controller and respository'
|    |          |-- users.controller.ts: 'The controller for routes'
|    |          |-- users.service.ts: 'The service to access to data'
|    |          |-- users.service.ts: 'The middleware to users routes'
|    |          |-- users.module.ts: 'The module, import depencencies and export services'
|    |          |-- users.exceptions.ts: 'This file provide all exceptions for users.'
|    |-- utils
|    |    |-- exceptions.ts: 'Exceptions constructor'
|    |-- index.ts : 'Content server init logic'
|-- index.js : 'Launch app, calling ts-node and our init server'
```

# Middleware
There is a [middleware](https://github.com/AgoraBinaria/reserva-escola/blob/master/server/src/modules/users/users.middleware.ts) for users routes. This middleware validate that in request header appear a field 'name' which contain the name from one of the users in the database. This is apply to all users routes.

The other [middleware](https://github.com/AgoraBinaria/reserva-escola/blob/master/server/src/modules/users/users2.middleware.ts) only validate in delete route, and test if the user will delete himself.