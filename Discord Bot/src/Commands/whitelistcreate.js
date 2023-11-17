import { SlashCommandBuilder } from '@discordjs/builders'; 

const defaultWhitelistCommand = new SlashCommandBuilder()
    .setName('ownerwhitelistmessage')
    .setDescription('Create initial message for whilelist tickets.');
export default defaultWhitelistCommand.toJSON();