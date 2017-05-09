# Servidor reserva-escola
Reservas para Escolas de Hostelaría


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
|    |          |-- users.module.ts: 'The module, import depencencies and export services'
|    |-- index.ts : 'Content server init logic'
|-- index.js : 'Launch app, calling ts-node and our init server'
```