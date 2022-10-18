module.exports = {
    name: 'message',
    async execute(client) {
      console.log('pterodactyl, bot started');
      client.user.setActivity('Logikk\'s Discord', {type: "WATCHING"});
      const conftchannel = client.channels.cache.get(client.config.ticketChannel)
    }
}