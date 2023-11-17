import { SlashCommandBuilder } from '@discordjs/builders'; 

const handledCommand = new SlashCommandBuilder()
    .setName('handled')
    .setDescription('Mark this ticket as handled.');
export default handledCommand.toJSON();