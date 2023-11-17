import { SlashCommandBuilder } from '@discordjs/builders';

const unresponsiveCommand = new SlashCommandBuilder()
    .setName('unresponsive')
    .setDescription('Mark a whitelist ticket as unresponsive.')
    .addUserOption((option) => 
        option
        .setName('username')
        .setDescription('Discord username.')
        .setRequired(true)
    )
    .addChannelOption((option) => 
            option
            .setName('channel')
            .setDescription('Channel where the user is being whitelisted.')
            .setRequired(true)
    );
export default unresponsiveCommand.toJSON();