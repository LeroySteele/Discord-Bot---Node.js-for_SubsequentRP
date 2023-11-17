import { SlashCommandBuilder } from '@discordjs/builders'; 

const defaultSupportCommand = new SlashCommandBuilder()
    .setName('ownersupportmessage')
    .setDescription('Create initial message for support tickets.');
export default defaultSupportCommand.toJSON();