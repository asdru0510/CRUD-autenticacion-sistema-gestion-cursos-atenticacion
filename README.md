***API Gestión de bootcamps(cursos) y usuarios(Alumnos), CRUD solo back-end***

## Comenzando 🚀
--La API que se describe en este documento es una aplicación Node.js que permite gestionar cursos (Bootcamp) de una empresa de adiestramiento (o instituto). 

    La API cuenta con endpoints para crear, obtener, actualizar y eliminar usuarios y Bootcamps, así como para agregar usuarios a Bootcamps y obtener información detallada de los mismos. 
    
    La API permiten realizar las siguientes acciones para los usuarios: crear y guardar usuarios, obtener los Bootcamp de un usuario, obtener todos los usuarios incluyendo los Bootcamp, actualizar usuarios por ID y eliminar usuarios por ID. Para los Bootcamps. 
    Para los Bootcamps permiten crear y guardar nuevos Bootcamps, agregar usuarios a Bootcamps, obtener Bootcamps por ID y obtener todos los usuarios incluyendo los Bootcamps. La API está documentada y se puede acceder a ella a través de un navegador web o aplicacion POSTMAN.

##Stack usado: npm, express, nodeJS, Javascript, SQL (postgresql), ORM (sequelize).

## Instalando 🚀🚀
_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local 


1. Clona el repositorio del proyecto desde GitHub (comando git clone).
2. Abre una terminal y navega hasta la carpeta del proyecto.
3. Ejecuta el comando `npm install` para instalar todas las dependencias necesarias.
4. Crea una base de datos PostgreSQL y configura las credenciales en el archivo `config/db.config.js`.
5. Ejecuta el comando `npm start` para iniciar el servidor al iniciar el servidor se crean automaticamente las tablas necesarias en la base de datos.
6. Para uso de la API que es solo BACKEND, instala la aplicacion de escritorio POSTMAN o en tu navegador instala YARC (Yet Another REST Client) para poder hacer las acciones del CRUD en los endpoints correspondientes.



7. ##  🚀🚀🚀 Funciones API - Endpoints:

### *Todos los endpoint van antecedidos de http://localhost:3000/

-Funciones 

1 • Crear y guardar usuarios.                            NOTA: Enviarle en el body {"firstName":"nombre_usuario", "lastName":"apellido_usuario", "email":"email_usuario}
2 • Obtener los Bootcamp de un usuario.                 NOTA: Reemplazar ":id" por el id a consultar
3 • Obtener todos los Usuarios incluyendo, los Bootcamp. 
4 • Actualizar usuario por Id.                           NOTA: Reemplazar ":id" por el id a actualizar y enviarle por el body {"firstName":"nombre_usuario", "lastName":"apellido_usuario", "email":"email_usuario}
5 • Eliminar un usuario por Id.                          NOTA:Reemplazar ":id" por el id a eliminar

Para el Bootcamp:
6 • Crear y guardar un nuevo Bootcamp.                  NOTA: Enviarle en el body {"title":"titulo_bootcamp", "cue":número de sesiones(clases), "description":"descripción_bootcamp"}
7 • Agregar un Usuario a un Bootcamp.                   NOTA: Reemplazar ":userId" por el id del usuario a agregar y ":bootcampId" por el id del bootcamp (materia o curso)
8 • Obtener un Bootcamp por id.                         NOTA: Reemplazar ":id" por el id a consultar
9 • Obtener todos los Usuarios incluyendo los Bootcamp. 

| Metodo HTTP | Función |                 Endpoint                      | 
|    POST     |    1    |  api/users                                    | 
|    GET      |    2    |  api/users/:id                                | 
|    GET      |    3    |  api/users                                    | 
|    PUT      |    4    |  api/users/id                                 | 
|    DELETE   |    5    |  api/users/:id                                |
|    POST     |    6    |  api/bootcamps                                |
|    GET      |    7    |  api/users/add/:userId/bootcamps/:bootcampId  |
|    GET      |    8    |  api/bootcamps/:id                            | 
|    GET      |    9    |  api/bootcamps                                | 


##  🚀🚀🚀 ENJOY 🚀🚀🚀

