import { SlashCommandBuilder } from '@discordjs/builders'; 

const banAppealCommand = new SlashCommandBuilder()
    .setName('ownerbanappealmessage')
    .setDescription('Create initial message for ban appeal tickets.');
export default banAppealCommand.toJSON();