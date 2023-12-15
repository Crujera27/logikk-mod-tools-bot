/*
.____                 .__ __    __     ___________           .__          
|    |    ____   ____ |__|  | _|  | __ \__    ___/___   ____ |  |   ______
|    |   /  _ \ / ___\|  |  |/ /  |/ /   |    | /  _ \ /  _ \|  |  /  ___/
|    |__(  <_> ) /_/  >  |    <|    <    |    |(  <_> |  <_> )  |__\___ \ 
|_______ \____/\___  /|__|__|_ \__|_ \   |____| \____/ \____/|____/____  >
        \/    /_____/         \/    \/                                 \/  v1
  Copyright © (c) 2023 Crujera27
    Licencia: MIT
    GitHub: https://github.com/Crujera27
    Web: https://crujera.galnod.com
    Repositorio del proyecto: https://github.com/Crujera27/logikk-mod-tools-bot
*/
const fs = require('fs');
const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v9');
const {
  clientId
} = require('./config.json');
const t = require('./token.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({
  version: '9'
}).setToken(t.token);

rest.put(Routes.applicationCommands(clientId), {
    body: commands
  })
  .then(() => console.log('Comandos enviados a Discord por gmail.'))
  .catch(console.error);