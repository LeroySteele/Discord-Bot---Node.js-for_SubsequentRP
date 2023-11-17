import { SlashCommandBuilder } from '@discordjs/builders';

const removeUserCommand = new SlashCommandBuilder()
    .setName('removeuser')
    .setDescription('Remove a user from this ticket.')
    .addUserOption((option) => 
        option
        .setName('user')
        .setDescription('Select a username.')
        .setRequired(true)
    );
export default removeUserCommand.toJSON();