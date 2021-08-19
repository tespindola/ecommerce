# Instalacion
Tener instalado el paquete [npm](https://www.npmjs.com/) para poder ejecutar los siguientes comandos (instalan todas las dependencias del proyecto):

```bash
npm install
```

# Using knex

## Migrations
```bash
npx knex migrate:make {name_migration}
npx knex migrate:latest // run all migrations news
npx knex migrate:down // rollback migrations
```