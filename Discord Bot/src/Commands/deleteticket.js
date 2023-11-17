import { SlashCommandBuilder } from '@discordjs/builders'; 

const deleteTicketCommand = new SlashCommandBuilder()
    .setName('closeticket')
    .setDescription('Use this to delete a ticket.');
export default deleteTicketCommand.toJSON();