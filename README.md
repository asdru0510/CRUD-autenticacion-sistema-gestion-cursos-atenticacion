***API Gestión de bootcamps(cursos, asignaturas, materias, ramos) y usuarios(Alumnos), CRUD solo back-end con autenticacion y encriptacion de datos sensibles***

## Comenzando 🚀
--La API que se describe en este documento es una aplicación Node.js que permite gestionar bootcamps de una empresa de adiestramiento (instituto, universidad, centro de formación). 

    La API cuenta con endpoints para: 
    Crear, obtener, actualizar y eliminar usuarios y Bootcamps, 
    así como para agregar usuarios a Bootcamps y 
    obtener información detallada de los mismos. 
    
    La API permiten realizar las siguientes acciones para los usuarios: 
    Crear y guardar usuarios, obtener los Bootcamp de un usuario, 
    obtener todos los usuarios incluyendo los Bootcamp, 
    actualizar usuarios por ID y eliminar usuarios por ID. 
    
    Para los Bootcamps: 
    Permite crear y guardar nuevos Bootcamps, agregar usuarios a Bootcamps, 
    obtener Bootcamps por ID y obtener todos los usuarios incluyendo los Bootcamps. La API está documentada y se puede acceder a ella a través de un navegador web o aplicacion POSTMAN.

##Stack usado: npm, express, nodeJS, JWT, Javascript, SQL (postgresql), ORM (sequelize).

## Instalando 🚀🚀
_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local 


1. Clona el repositorio del proyecto desde GitHub (comando git clone).
2. Abre una terminal y navega hasta la carpeta del proyecto.
3. Ejecuta el comando `npm install` para instalar todas las dependencias necesarias.
4. Crea una base de datos PostgreSQL
5. En la terminal ubicate en la raiz del proyecto y crea un archivo con nombre ".env" aqui configura los parámetros de conexión a la BD.
```
1._ DB_NAME=nombre_de_DB_creada en el punto 4
2._ DB_USER=tu_usuario_de_postgres
3._ DB_PASS=tu_password_de_usuario_postgres
```
6. Ejecuta el comando `npm start` para iniciar el servidor al iniciar el servidor se crean automaticamente las tablas necesarias en la base de datos.
7. Para uso de la API que es solo BACKEND, instala la aplicacion de escritorio POSTMAN o en tu navegador instala YARC (Yet Another REST Client) para poder hacer las acciones del CRUD en los endpoints correspondientes.



7. ##  🚀🚀🚀 Funciones API - Endpoints:

### *Todos los endpoint van antecedidos de http://localhost:3000/

-Funciones 

1 • Registro de un nuevo usuario.<br>                            NOTA: Enviarle en el body {"firstName":"nombre_usuario", "lastName":"apellido_usuario", "password":"password_usuario","email":"email_usuario}
2 • Inicio de sesión en la API.<br>                 NOTA: Enviarle en el body { "password":"password_usuario","email":"email_usuario}
3 • Consultar los datos del usuario según id<br>     NOTA: Reemplazar ":id" por el id a consultar
4 • Lista información de todos los usuarios y los Bootcamp
registrados.
5 • Actualizar usuario por Id.<br>                           NOTA: Reemplazar ":id" por el id a actualizar y enviarle por el body {"firstName":"nombre_usuario", "lastName":"apellido_usuario", "email":"email_usuario, password:password}
6 • Eliminar un usuario por Id.<br>                          NOTA:Reemplazar ":id" por el id a eliminar

Para el Bootcamp:
7 • Crear y guardar un nuevo Bootcamp.<br>                  NOTA: Enviarle en el body {"title":"titulo_bootcamp", "cue":número de sesiones(clases), "description":"descripción_bootcamp"}
8 • Agregar un Usuario a un Bootcamp.<br>                   NOTA: Enviarle en el body {"userId":"id_user", "bootcampId":"id_bootcamp"} Reemplazar "id_user" por el id del usuario a agregar y "id_bootcamp" por el id del bootcamp (materia o curso)
9 • Obtener un Bootcamp por id.<br>                         NOTA: Reemplazar ":id" por el id a consultar
10 • Obtener todos los Usuarios incluyendo los Bootcamp. 

| Metodo HTTP | Función |                 Endpoint                      |
| ------------ | ------------ | ------------ | 
|    POST     |    1    |  api/signup                                   |
|    POST     |    2    |  api/signin                                   | 
|    GET      |    3    |  api/users/:id                                | 
|    GET      |    4    |  api/users                                    | 
|    PUT      |    5    |  api/users/:id                                | 
|    DELETE   |    6    |  api/users/:id                                |
|    POST     |    7    |  api/bootcamps                                |
|    POST     |    8    |  api/bootcamps/adduser                        |
|    GET      |    9    |  api/bootcamps/:id                            | 
|    GET      |    10   |  api/bootcamps                                | 
<br><br>

##  🚀🚀🚀 ENJOY 🚀🚀🚀

Despedida
¡Gracias por visitar nuestro proyecto! Esperamos que hayas disfrutado explorando nuestra API. Si tienes alguna pregunta, sugerencia o comentario, no dudes en ponerte en contacto en mi perfil en la sección de "Redes Sociales" puedes ubicar nuestros datos de contacto. Estamos aquí para ayudar y recibir tus comentarios.

¡Que tengas un gran día y esperamos verte nuevamente pronto

