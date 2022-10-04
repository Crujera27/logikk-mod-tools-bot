const { BurgerClient } = require('burgerclient');
const { GatewayIntentsBits } = require('discord.js');
const path = require('path');
const client = new BurgerClient({
  typescript: false,                    // Whether or not your project is made in typescript
  intents: ['7796'], // Put your intents here
  partials: [],                         // Put your partials here
  testGuild: '905124554303762552',              // Test guild ID for commands with the `type: 'GUILD'` property
  logInfo: true,                        // Whether or not to log info logs (enabled by default)
  mongoURI: 'mongodb://uhn14knmm6vsrsnobok9:rjHSUCpUiBp7MTE5rqhK@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bzibpmc6qkvb9sx?replicaSet=rs0',                // URI for connecting to MongoDB, if supplied
});

// Listener to when the client is ready and the database has been connected to
client.onReady(async discordClient => {
  client.registerAllCommands(path.resolve('commands')); // Registers all commands in the directory ./commands
  // Instead of registering all commands in a directory, you can also register a specific command in a file
  // client.registerCommand(require('./commands/ping'), 'ping');

  await client.updateCommands();    // Updates all application commands
  await client.updatePermissions(); // Updates all application command permissions

  console.log(`Sesión iniciada: ${discordClient.user.tag}`);
});

// Listener when a user creates an interaction
client.on('interactionCreate', interaction => {
  if (!interaction.isChatInputCommand()) return; // Checks if the command is a slash (/) command

  client.resolveCommand(interaction); // Executes the command
});

client.login('Nzk2MDU4MjI2MzQ0MzI5Mjc2.GF9Xxa.mZ__Pt1N_xC-Do6-2ohIJCcmLafIof1eFJ_YH0'); // Logins to Discord using your bot's token