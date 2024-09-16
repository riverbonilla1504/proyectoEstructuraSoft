Proyecto  Estructura de datos
Sobre el proyecto: el proyecto se enfoca a crear una pagina web para subir un juego en estado de beta, todos podran registrarse pero quedaran en lista de espera a ser aceptados para poder descargar el juego, aqui se aplicaran varios conocimientos adquiridos y vistos en clases como listas, arrays, colas y pilas, aplicando estos conceptos podemos lograr cosas como hacer un login y un registro, una lista de espera para aceptar entrar a la beta a los registrados, y un sistema de descarga organizado, tambien se exploró y se aplicó conceptos como la conexion a una base de datos externa, como lo es AWS, creacion de una API REST, como subir y hacer Deploy de una pagina web tanto backend como frontend.
Como iniciarlo de manera local:
Instalar Python
Instalar Node.js
entrar a la carpeta de proyecto y ejecutar los siguientes comandos
npm install
npm start 

entrar a la carpeta de backend y ejecutar el siguiente comando
python server.py


IMPORTANTE: 
tener en cuenta que el backend se inicializa en el puerto 3001 para comunicarse con el frontend, si se quiere cambiar se tiene que hacer manualmente en cada uso de la api, cambiar la constante de apiUrl y cambiar el puerto del server en el backend.

si se quiere cambiar la base de datos tener en cuenta la estructura de las tablas y las columnas, y cambiar las variables de conexion en el server.py

en la pagina web subida en https://proyectoestructurasoft.onrender.com/ puede que al intentar hacer una peticion al backend la primera vez se demore 1 minuto o mas ya que en la pagina que se subio es gratis el host y se demora en responder la primera vez a el backend.

para entrar a devtool se debe hacer con las siguientes credenciales:
email: admin@admin.com
password: admin
aqui apareceran todos los nuevos usuarios registrados que no tengan el acceso a la beta y se podran aceptar los usuarios para que puedan descargar el juego

el juego todavia no esta subido pero en el codigo se puede ver como funciona el sistema de descarga para el juego