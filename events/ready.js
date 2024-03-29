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
module.exports = {
  name: 'ready',
  async execute(client) {
    console.log('pterodactyl, bot started');
    client.user.setActivity('Logikk\'s Discord', {type: "WATCHING"});
    const conftchannel = client.channels.cache.get(client.config.ticketChannel)

    function sendTicketMSG() {
      const embed = new client.discord.MessageEmbed()
        .setColor('ff0000')
        .setAuthor('Soporte', client.user.avatarURL())
        .setDescription('Una vez presione "Crear nuevo ticket" se le solicitará en la categoría que lo desea crear.\n\nCategorías:\n - Reportar a un usuario\n- Reportar a un staff\n- Duda relatada con el Servidor\n - Reclamar un premio (de un sorteo)')
        .setFooter(client.config.footerText, client.user.avatarURL())
      const row = new client.discord.MessageActionRow()
        .addComponents(
          new client.discord.MessageButton()
          .setCustomId('open-ticket')
          .setLabel('Crear nuevo ticket')
          .setEmoji('🎫')
          .setStyle('PRIMARY'),
        );

      conftchannel.send({
        embeds: [embed],
        components: [row]
      })
    }

    const toDelete = 10000;

    async function fetchMore(channel, limit) {
      if (!channel) {
        throw new Error(`Canal creado ${typeof channel}.`);
      }
      if (limit <= 100) {
        return channel.messages.fetch({
          limit
        });
      }

      let collection = [];
      let lastId = null;
      let options = {};
      let remaining = limit;

      while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
          options.before = lastId;
        }

        let messages = await channel.messages.fetch(options);

        if (!messages.last()) {
          break;
        }

        collection = collection.concat(messages);
        lastId = messages.last().id;
      }
      collection.remaining = remaining;

      return collection;
    }

    const list = await fetchMore(conftchannel, toDelete);

    let i = 1;

    list.forEach(underList => {
      underList.forEach(msg => {
        i++;
        if (i < toDelete) {
          setTimeout(function () {
            msg.delete()
          }, 1000 * i)
        }
      })
    })

    setTimeout(() => {
      sendTicketMSG()
    }, i);
  },
};
