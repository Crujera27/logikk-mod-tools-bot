const { ICommand } = require('burgerclient');
const { SlashCommandBuilder } = require('discord.js');

// For intellisense and auto-completions
/**
 * @type {ICommand}
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),

  type: 'GLOBAL', // Command type can be either GUILD or GLOBAL
  
  // Optional permissions
  permissions: {
    default: 'SendMessages', // Default member permissions (only users with a specific permission can use this command)
    DMs: true,               // Whether or not this command is enabled in DMs (enabled by default)
  },

  listeners: {
    // Gets called when the command is executed
    onExecute: async ({ interaction }) => {
      interaction.reply('Pong!');
    },
    
    // Optional `onError` listener that gets called when an unexpected error gets thrown while executing the command
    onError: ({ error, interaction }) => {
      interaction.reply(`Uh oh, an error occurred! ${error.message}`);
    },
  },
};