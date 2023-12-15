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
let hastebin = require('hastebin');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    if (interaction.customId == "open-ticket") {
      if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
        return interaction.reply({
          content: '¡Ya has creado un ticket!',
          ephemeral: true
        });
      };

      interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        parent: client.config.parentOpened,
        topic: interaction.user.id,
        permissionOverwrites: [{
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: client.config.roleSupport,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async c => {
        interaction.reply({
          content: `Ticket creado: <#${c.id}>`,
          ephemeral: true
        });

        const embed = new client.discord.MessageEmbed()
          .setColor('ff9600')
          .setAuthor('Razón', ' ')
          .setDescription('Especifica una razón por la que estas abriendo este ticket.')
          .setFooter('Logikk\'s Discord | Support', ' ')
          .setTimestamp();

        const row = new client.discord.MessageActionRow()
          .addComponents(
            new client.discord.MessageSelectMenu()
            .setCustomId('category')
            .setPlaceholder('Especifica una razón por la que estas abriendo este ticket.')
            .addOptions([{
                label: 'Reportar usuario',
                value: 'Reportar Usuario',
                emoji: { name: 'ℹ️' }
              },
              {
                label: 'Reportar staff',
                value: 'Reportar staff',
                emoji: { name: '❗' }
              },
              {
                label: 'Duda relatada con el servidor',
                value: 'Duda',
                emoji: { name: '❓' }
              },
              {
                label: 'Reclamar un premio',
                value: 'Reclamar un premio',
                emoji: { name: '🎉' }
              },
            ]),
          );

        msg = await c.send({
          content: `<@!${interaction.user.id}>`,
          embeds: [embed],
          components: [row]
        });

        const collector = msg.createMessageComponentCollector({
          componentType: 'SELECT_MENU',
          time: 20000
        });

        collector.on('collect', i => {
          if (i.user.id === interaction.user.id) {
            if (msg.deletable) {
              msg.delete().then(async () => {
                const embed = new client.discord.MessageEmbed()
                  .setColor('ff9600')
                  .setAuthor('Ticket', ' ')
                  .setDescription(`<@!${interaction.user.id}> ha creado un ticket con la razón ${i.values[0]}`)
                  .setFooter('Logikk\'s Discord | Support', ' ')
                  .setTimestamp();

                const row = new client.discord.MessageActionRow()
                  .addComponents(
                    new client.discord.MessageButton()
                    .setCustomId('close-ticket')
                    .setLabel('Cerrar ticket')
                    .setEmoji('899745362137477181')
                    .setStyle('DANGER'),
                  );

                const opened = await c.send({
                  content: `<@&${client.config.roleSupport}>`,
                  embeds: [embed],
                  components: [row]
                });

                opened.pin().then(() => {
                  opened.channel.bulkDelete(1);
                });
              });
            };
            if (i.values[0] == 'Reportar Usuario') {
              c.edit({
                parent: client.config.ReportarUsuario
              });
            };
            if (i.values[0] == 'Reportar staff') {
              c.edit({
                parent: client.config.Reportarstaff
              });
            };
            if (i.values[0] == 'Duda') {
              c.edit({
                parent: client.config.Duda
              });
            };
            if (i.values[0] == 'Reclamar un premio') {
              c.edit({
                parent: client.config.Reclamarpremio
              });
            };
            if (i.values[0] == 'Partnership') {
              c.edit({
                parent: client.config.parentPartnership
              });
            };
          };
        });

        collector.on('end', collected => {
          if (collected.size < 1) {
            c.send(`No hay ninguna razón, el ticket será cerrado.`).then(() => {
              setTimeout(() => {
                if (c.deletable) {
                  c.delete();
                };
              }, 5000);
            });
          };
        });
      });
    };

    if (interaction.customId == "close-ticket") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      const row = new client.discord.MessageActionRow()
        .addComponents(
          new client.discord.MessageButton()
          .setCustomId('confirm-close')
          .setLabel('Confirmar')
          .setStyle('DANGER'),
          new client.discord.MessageButton()
          .setCustomId('no')
          .setLabel('Cancelar')
          .setStyle('SECONDARY'),
        );

      const verif = await interaction.reply({
        content: '¿Seguro que desea cerrar el ticket?',
        components: [row]
      });

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 10000
      });

      collector.on('collect', i => {
        if (i.customId == 'confirm-close') {
          interaction.editReply({
            content: `El ticket fue cerrado por <@!${interaction.user.id}>`,
            components: []
          });

          chan.edit({
              name: `🟥-${chan.name}`,
              permissionOverwrites: [
                {
                  id: client.users.cache.get(chan.topic),
                  deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: client.config.roleSupport,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
              ],
            })
            .then(async () => {
              const embed = new client.discord.MessageEmbed()
                .setColor('ff9600')
                .setAuthor('Ticket', ' ')
                .setDescription('```Guardando ticket...```')
                .setFooter('Logikk\'s Discord', ' ')
                .setTimestamp();

              const row = new client.discord.MessageActionRow()
                .addComponents(
                  new client.discord.MessageButton()
                  .setCustomId('delete-ticket')
                  .setLabel('Eliminar ticket')
                  .setEmoji('🗑️')
                  .setStyle('DANGER'),
                );

              chan.send({
                embeds: [embed],
                components: [row]
              });
            });

          collector.stop();
        };
        if (i.customId == 'no') {
          interaction.editReply({
            content: 'El proceso de cerrar el ticket fue cancelado.',
            components: []
          });
          collector.stop();
        };
      });

      collector.on('end', (i) => {
        if (i.size < 1) {
          interaction.editReply({
            content: 'El proceso de cerrar el ticket fue cancelado.',
            components: []
          });
        };
      });
    };

    if (interaction.customId == "delete-ticket") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      interaction.reply({
        content: 'El ticket fue registrado.'
      });

      chan.messages.fetch().then(async (messages) => {
        let a = messages.filter(m => m.author.bot !== true).map(m =>
          `${new Date(m.createdTimestamp).toLocaleString('de-DE')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
        ).reverse().join('\n');
        if (a.length < 1) a = "Nadie escribió en el ticket..."
        hastebin.createPaste(a, {
            contentType: 'text/plain',
            server: client.config.hasteServer
          }, {})
          .then(function (urlToPaste) {
            const embed = new client.discord.MessageEmbed()
              .setAuthor('Logs Ticket', ' ')
              .setDescription(`📰 Ticket-Logs \`${chan.id}\` creado por <@!${chan.topic}> eliminado por <@!${interaction.user.id}>\n\nLogs: [**Click para ver log del ticket**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            const embed2 = new client.discord.MessageEmbed()
              .setAuthor('Registro del ticket.', ' ')
              .setDescription(`📰 Registro de tu ticket. \`${chan.id}\`: [**Click aquí para ver el log de tu ticket.**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            client.channels.cache.get(client.config.logsTicket).send({
              embeds: [embed]
            });
            client.users.cache.get(chan.topic).send({
              embeds: [embed2]
            }).catch(() => {console.log('El DM no fue enviado')});
            chan.send('Eliminando el canal...');

            setTimeout(() => {
              chan.delete();
            }, 5000);
          });
      });
    };
  },
};
