import { SlashCommandBuilder } from '@discordjs/builders';

const addUserCommand = new SlashCommandBuilder()
    .setName('adduser')
    .setDescription('Add a user to this ticket.')
    .addUserOption((option) => 
        option
        .setName('user')
        .setDescription('Select a username.')
        .setRequired(true)
    );
export default addUserCommand.toJSON();