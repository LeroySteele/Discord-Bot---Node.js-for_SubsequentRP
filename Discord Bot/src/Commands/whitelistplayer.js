import { SlashCommandBuilder } from '@discordjs/builders';

const whitelistPlayerCommand = new SlashCommandBuilder()
    .setName('whitelistplayer')
    .setDescription('Use this command to whitelist a user')
    .addUserOption((option) => 
        option
        .setName('username')
        .setDescription('Discord username.')
        .setRequired(true)
    )
    .addStringOption((option) => 
        option
        .setName('character-name')
        .setDescription('Update player nickname.')
        .setRequired(true)
    )
    /*.addStringOption((option) => 
        option
        .setName('channel')
        .setDescription('Start with `#` to get channel suggestions on where the user is being whitelisted.')
        .setRequired(true)
    )*/
    .addChannelOption((option) => 
        option
        .setName('channel')
        .setDescription('Channel where the user is being whitelisted.')
        .setRequired(true)
    )
    .addStringOption((option) => 
        option
        .setName('new-to-rp')
        .setDescription('Is this person new to RP.')
        .setRequired(true)
        .setChoices(
            {
                name: 'Yes',
                value: 'yes',
            },
            {
                name: 'No',
                value: 'no',
            }
        )
    )
    .addStringOption((option) => 
        option
        .setName('age')
        .setDescription('Is this person under 18.')
        .setRequired(true)
        .setChoices(
            {
                name: '18 or over',
                value: '18',
            },
            {
                name: 'Under 18',
                value: '17',
            },
            {
                name: 'Under 17',
                value: '16',
            }
        )
    );
export default whitelistPlayerCommand.toJSON();