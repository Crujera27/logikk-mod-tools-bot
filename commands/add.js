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
const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('(Ticket) Agregar usuario')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Añade a un usuario al ticket.')
      .setRequired(true)),
  async execute(interaction, client) {
    const chan = client.channels.cache.get(interaction.channelId);
    const user = interaction.options.getUser('target');

    if (chan.name.includes('ticket')) {
      chan.edit({
        permissionOverwrites: [{
          id: user,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
          {
            id: client.config.roleSupport,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
      ],
      }).then(async () => {
        interaction.reply({
          content: `<@${user.id}> fue añadido`
        });
      });
    } else {
      interaction.reply({
        content: 'No tienes ningún ticket.',
        ephemeral: true
      });
    };
  },
};
