# 🔐 security-express-jwt

Este proyecto es un ejemplo de un sistema de autenticación y autorización basado en JSON Web Tokens (JWT) utilizando Express, TypeScript y TypeORM. Incluye dos controladores: uno de autenticación (`AuthController`) y otro de usuario (`UserController`).

## 🚀 Instalación

1. Clona el repositorio en tu máquina local: `git clone https://github.com/lleontor705/security-express-jwt.git`
2. Instala las dependencias del proyecto: `npm install`
3. Configura tu base de datos en el archivo `ormconfig.ts`. Asegúrate de especificar `postgres` como el tipo de base de datos.
4. Ejecuta las migraciones: `npm run migrate:up`
5. Inicia el proyecto en modo desarrollo: `npm run start:dev`
6. Inicia el proyecto en modo producción: `npm run prod`

## 🛠 Uso

Una vez que el proyecto está iniciado, puedes interactuar con él a través de la API REST. Ejemplos de cómo interactuar con el proyecto:

- Iniciar sesión: `POST http://localhost:3000/auth/login` con un cuerpo de petición que incluya `email` y `password`
- Cerrar sesión: `POST http://localhost:3000/auth/logout` 
- Validar un token: `GET http://localhost:3000/auth/validate-token` 
- Refrescar un token: `POST http://localhost:3000/auth/refresh-token` 
- Crear un nuevo usuario: `POST http://localhost:3000/users` con un cuerpo de petición que incluya `name`, `email`, y `password`
- Obtener una lista de usuarios: `GET http://localhost:3000/users`
- Obtener un usuario específico: `GET http://localhost:3000/users/id`
- Actualizar un usuario: `PUT http://localhost:3000/users/id`
- Eliminar un usuario: `DELETE http://localhost:3000/users/id`

## 🔧 Configuración

Puedes personalizar el proyecto editando las siguientes opciones en el archivo `.env`:
- Puerto en el que se ejecutará el proyecto: `PORT`
- Variables de entorno para la conexión a la base de datos, como el nombre de usuario y la contraseña: `TYPEORM_USERNAME`, `TYPEORM_PASSWORD`, etc.
- Variables de entorno para el manejo de JWT, como el secreto y la vigencia en minutos: `JWT_SECRET`, `JWT_EXPIRE_IN_MINUTE`

## 📝 Notas
- El controlador de usuarios se llama `UserController` y el método de refresco de token es un `POST`.
- El proyecto esta configurado con postgres y se llama `security-express-jwt`

## 📚 Recursos
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [JSON Web Tokens](https://jwt.io/)


# 🔐 security-express-jwt

This project is an example of a JSON Web Token (JWT) based authentication and authorization system using Express, TypeScript and TypeORM. It includes two controllers: an authentication controller (`AuthController`) and a user controller (`UserController`).

## 🚀 Installation

1. Clone the repository on your local machine: `git clone https://github.com/lleontor705/security-express-jwt.git`
2. Install the project's dependencies: `npm install`
3. Configure your database in the `ormconfig.ts` file. Make sure to specify `postgres` as the database type.
4. Run migrations: `npm run migrate:up`
5. Start the project in development mode: `npm run start:dev`
6. Start the project in production mode: `npm run prod`

## 🛠 Usage

Once the project is running, you can interact with it via the REST API. Examples of how to interact with the project:

- Log in: `POST http://localhost:3000/auth/login` with a request body that includes `email` and `password`
- Log out: `POST http://localhost:3000/auth/logout` 
- Validate a token: `GET http://localhost:3000/auth/validate-token` 
- Refresh a token: `POST http://localhost:3000/auth/refresh-token` 
- Create a new user: `POST http://localhost:3000/users` with a request body that includes `name`, `email`, and `password`
- Get a list of users: `GET http://localhost:3000/users`
- Get a specific user: `GET http://localhost:3000/users/id`
- Update a user: `PUT http://localhost:3000/users/id`
- Delete a user: `DELETE http://localhost:3000/users/id`

## 🔧 Configuration

You can customize the project by editing the following options in the `.env` file:
- Port on which the project will run: `PORT`
- Environment variables for the database connection, such as the username and password: `TYPEORM_USERNAME`, `TYPEORM_PASSWORD`, etc.
- Environment variables for JWT management, such as the secret and expiry time in minutes: `JWT_SECRET`, `JWT_EXPIRE_IN_MINUTE`

## 📝 Notes
- The user controller is called `UserController` and the refresh token method is a `POST`.
- The project is configured with postgres and is called `security-express-jwt`

## 📚 Resources
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [JSON Web Tokens](https://jwt.io/)
