# Codificación de tarjetas usando un SAM bajo demanda
El desarrollo está hecho para responder a las peticiones enviadas al SAM de RTP para Actualizacion, verificación de PIN y Rehabilitación de la Aplicación de Transporte de una tarjeta de Movilidad Integrada.
<br>

El uso está restringido a usuarios designados por personal de RTP y todos los procesos de la aplicación están monitoreadas con métodos de auditoria.
<br>

Para realizar pruebas, obtener una licencia de uso, etc. Comuniquese con el área de desarrollo de RTP.
<br>

Cualquier uso indebido puede representar un delito.


## Instalación.
1) Ingresa a la carpeta "server" e instala las dependencias
   ~~~
   npm i
   ~~~
2) Inicia el servidor local
   ~~~
   nodemon apps.js
   ~~~
3) Ingresa desde otra terminal a la carpeta client e inicia el servidor del front
   ~~~
   npm start
   ~~~

##  Recomendaciones para colaboradores.
1) Recuerda trabajar unicamente sobre tu rama.
2) Baja la versión más reciente del main antes de trabajar una función nueva.
3) Puedes bajar la versión más reciente del main a una rama secundaria de tu repo local y después realizar un merge a tu rama principal para evitar errores no previstos.
4) Comunica a tu equipo cuando hayas hecho un nuevo pull a tu rama.
