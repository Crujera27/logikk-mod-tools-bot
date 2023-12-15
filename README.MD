
# Logikk's Tools - 1.X

<br>

Versión inicial del sistema de tickets utilizado en el servidor de Logikk's Discord. Este sistema ha sido descontinuado a partir del 13 de enero de 2023, y su código correspondiente ha sido públicamente divulgado desde el 15 de diciembre de 2023.

<br>

La presente versión no corresponde al software actualmente empleado en el servidor de Discord de Logikk. Hasta la redacción de este documento, se ha implementado la versión 2.0 de Logikk's Tools. No obstante, este proyecto en su forma básica puede resultar de utilidad para aquellos que se encuentren en las primeras etapas de aprendizaje o carezcan de un conocimiento extenso y requieran un bot de tickets personalizado con su nombre. Es preciso destacar que este código se distribuye bajo la licencia MIT; para obtener información detallada al respecto, se recomienda consultar el archivo de licencia adjunto.
<br>

En la última revisión se ha adaptado para que pueda ser utilizado externamente. Incorporando alguna opción más en la config para eliminar la necesidad de tener que ir al código.

<br>

Instrucciones para utilizar el código

  

1. Descarga el código y descomprímelo en la carpeta correspondiente.

  

2. Instala las dependencias ejecutando el siguiente comando en tu terminal:

  

```bash

  

npm  install

  

```

  
  

Accede al archivo token.json y proporciona el token de tu bot. Debería quedar de la siguiente manera:

  

```json

  

{

"token": "mi token super secreto"

}

  

```

  

3. Ve al archivo config.json y completa la información solicitada:

clientId: ID del bot.

hasteServer: URL del servidor de haste (para registros completos del ticket).

ReportarUsuario: Categoría donde se colocarán los tickets creados para reportar a usuarios.

Reportarstaff: Categoría donde se colocarán los tickets creados para reportar a un staff.

Duda: Categoría donde se colocarán los tickets creados con respecto a dudas sobre el servidor.

Reclamarpremio: Categoría para colocar los tickets que, después de haber sido cerrados, necesiten reclamarse.

roleSupport: ID del rol que debe llevar todo el personal de soporte/operativo (este es el rol mencionado por el bot).

logsTicket: Canal de logs para los tickets.

ticketChannel: Canal donde se envía el panel de creación de tickets.

footerText: Texto en los embudos del bot.

  

4. Inicia el bot

  

```bash

  

npm  run  start

  

```

  <br>

### ESTÁ VERSIÓN, ESTÁ DESACTUALIZADA, NO OFREZCO SOPORTE ALGUNO, PUESTO QUE ESTÁ ARCHIVADA. Tal vez algún día la versión 2.X de Logikk's Tools es publicada.
