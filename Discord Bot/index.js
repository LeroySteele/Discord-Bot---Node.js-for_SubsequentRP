import { REST } from '@discordjs/rest';
import { ChannelType, Client, GatewayIntentBits, Routes, PermissionsBitField, ButtonStyle, ActivityType} from 'discord.js';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder} from '@discordjs/builders';
import * as discordTranscripts from 'discord-html-transcripts';

import defaultWhitelistCommand from './src/Commands/whitelistcreate.js';
import defaultSupportCommand from './src/Commands/supportcreate.js';
import deleteTicketCommand from './src/Commands/deleteticket.js';
import addUserCommand from './src/Commands/adduser.js';
import removeUserCommand from './src/Commands/removeuser.js';
import banAppealCommand from './src/Commands/banappealcreate.js';
import whitelistPlayerCommand from './src/Commands/whitelistplayer.js';
import handledCommand from './src/Commands/handled.js';
import unresponsiveCommand from './src/Commands/unresponsive.js'

//dev ID's
const TOKEN = ''; //bot token
const CLIENT_ID = '';// bot ID
const GUILD_ID = ''; //server ID
const rest = new REST({version: '10'}).setToken(TOKEN);
const client = new Client({intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

//Role ID's
const ownerrole = `1163144218299084840`;
const adminteamrole = `1166694784111497317`;
const supportstaffrole = `1166684589230673951`;
const whitelistingstaffrole = `1163144643882524753`;
const citizenrole = `1166694207398875207`;
const newtorprole = `1166682856987304018`;
const undereighteen = `1166683809660551238`;
const underseventeen = `1167919958588674088`;
const whitelistedrole = `1163136366293549066`;
const unwhitelistedrole = `1166330952918769674`;
const jobsrole = `1167418663561859143`;
const notificationrole = `1167418781832851457`;
const regionrole = `1167418903945814036`;
//channel/category ID's
const ownerannouncechannel = `1166329559344488538`;
const unwhitelistedannouncechannel = `1166315451861696529`;
const whitelistedannouncechannel = `1166315492890378240`;

const whitelistmessagechannel = `1163132870156619796`;
const supportmessagechannel = `1163182553109385256`;
const banappealmessagechannel = `1166486464721322114`;

const whitelistcategory = `1163157575240532090`;
const whitelistcompletedcategory = `1168128147007479869`;
const awaitinginterviewcategory = `1168128320353861693`;
const whitelistinprogresscategory = `1168128370752618526`;
const whitelistonholdcategory = `1168128424037060618`;
const unresponsivecategory = `1168128510750101544`;

const supportcategory = `1164379633312092251`;
const techsupportchannel = `1166733697878331544`;
const subdiscordschannel = `1089250686052597901`;

const reportcategory = `1163181610120790147`;
const applicationcategory = `1163182088707653732`;
const secondcharactercategory = `1164381174223884349`;

const staffapplicationcategory = `1164086102332801035`;
const banappealcategory = `1166499369537765487`;
const ownerticketcategory = `1164084857270448158`;

const handledsuppchannel = `1166434451077730354`;
const handledreportenappchannel = `1167925983949639770`;
const handledownerchannel = `1167926089323131001`;

const whiensupptranschannel = `1163164312441978994`;
const repenapptranschannel = `1164080261332467762`;
const ownertranschannel = `1164080954701254686`;


client.on('ready', () => console.log(`${client.user.tag}`));
client.on('ready', () => client.user.setActivity({name: "Subsequent RP"}));

client.on('interactionCreate', async (interaction) => {
    const deleteTicket = new ButtonBuilder()                                       
    .setCustomId('closeChannel')
    .setLabel("🗑️ Close Ticket")
    .setStyle(ButtonStyle.Danger)
    .setDisabled(false);
    if (interaction.isChatInputCommand()) {
        if ((interaction.commandName === 'ownerwhitelistmessage') ) {                       //Create Whitelist message with command
            if (interaction.channelId === whitelistmessagechannel) {
                if ( (await interaction.member.roles.cache.some(role => role.id === ownerrole))  || (interaction.user.id === "608742705333534730")) {
                    try{
                        await interaction.reply(`success`);
                        await interaction.deleteReply();
                        const whitelistButton = new ButtonBuilder()                 
                        .setCustomId('whitebutton')
                        .setLabel("📋 Apply")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);

                        const initialEmbed = new EmbedBuilder()
                        .setTitle('Welcome to Subsequent Roleplay!')
                        .setDescription(`:white_check_mark: Please be sure to read our rules and once done, click "Apply" below to open a whitelisting ticket.\n\n:alarm_clock: Once submitted, our staff will review your application and then we will arrange for an interview.\n\n:fire: Get ready to join an amazing community with some of the best roleplay you'll experience.`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Subsequent RP',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});

                        await interaction.channel.send({                           
                            embeds: [initialEmbed],
                            components: [new ActionRowBuilder().addComponents(whitelistButton)]                            
                        });
                    }catch(err){
                        console.log(err);
                    }
                }else {
                    await interaction.channel.send(`Only owners are able to use this command!`);
                }
            }else {
                await interaction.channel.send(`Please send this message in the main whitelist channel!`);
            }
        }else if (interaction.commandName === 'closeticket') {                                //Close Ticket Command
            if (    (interaction.channel.parentId === whitelistcategory) ||
                    (interaction.channel.parentId === awaitinginterviewcategory ) ||
                    (interaction.channel.parentId === whitelistinprogresscategory ) ||
                    (interaction.channel.parentId === whitelistonholdcategory ) ||
                    (interaction.channel.parentId === unresponsivecategory ) ||
                    (interaction.channel.parentId === whitelistcompletedcategory ) ||
                    (interaction.channel.parentId === supportcategory) ||             
                    (interaction.channel.parentId === reportcategory) ||             
                    (interaction.channel.parentId === applicationcategory) ||            
                    (interaction.channel.parentId === secondcharactercategory) ||             
                    (interaction.channel.parentId === staffapplicationcategory) ||             
                    (interaction.channel.parentId === ownerticketcategory) ||
                    (interaction.channel.parentId === banappealcategory) ||
                    (interaction.channel.parentId === handledsuppchannel) ||
                    (interaction.channel.parentId === handledreportenappchannel) ||
                    (interaction.channel.parentId === handledownerchannel) 
                ){
                    if ((await interaction.member.roles.cache.some(role => role.id === whitelistingstaffrole)) || (await interaction.member.roles.cache.some(role => role.id === supportstaffrole) || (await interaction.member.roles.cache.some(role => role.id === whitelistingstaffrole))) || (await interaction.member.roles.cache.some(role => role.id === adminteamrole))) {
                        try{
                            await interaction.reply(`success`);
                            await interaction.deleteReply();
                            const mes = await interaction.channel.messages.fetch();
                            const firstmessage = mes.last();
                            const attachment = await discordTranscripts.createTranscript(interaction.channel);
                            const playerid =firstmessage.content.replace('<', '').replace('@', '').replace('$', '').replace('{', '').replace('}', '').replace('>', '');
                            const player = await client.users.fetch(playerid);
                            if ( (interaction.channel.parentId === whitelistcategory) || (interaction.channel.parentId === awaitinginterviewcategory) || (interaction.channel.parentId === whitelistinprogresscategory) || (interaction.channel.parentId === whitelistonholdcategory) || (interaction.channel.parentId === unresponsivecategory) || (interaction.channel.parentId === whitelistcompletedcategory )) {
                                const transcriptChan = client.channels.cache.find(ch => ch.id === whiensupptranschannel);
                                await transcriptChan.send({
                                    content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                                    files: [attachment]
                                });
                            }else if (  (interaction.channel.parentId === supportcategory) || (interaction.channel.parentId === handledsuppchannel) ) {
                                const transcriptChan = client.channels.cache.find(ch => ch.id === whiensupptranschannel);
                                await transcriptChan.send({
                                    content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                                    files: [attachment]
                                });
                            }else if ( (interaction.channel.parentId === reportcategory) || (interaction.channel.parentId === applicationcategory) || (interaction.channel.parentId === secondcharactercategory) || (interaction.channel.parentId === handledreportenappchannel) ) {
                                const transcriptChan = client.channels.cache.find(ch => ch.id === repenapptranschannel);
                                await transcriptChan.send({
                                    content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                                    files: [attachment]
                                });
                            }else if ( (interaction.channel.parentId === staffapplicationcategory) || (interaction.channel.parentId === ownerticketcategory) || (interaction.channel.parentId === banappealcategory) || (interaction.channel.parentId === handledownerchannel) ) {
                                const transcriptChan = client.channels.cache.find(ch => ch.id === ownertranschannel);
                                await transcriptChan.send({
                                    content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                                    files: [attachment]
                                });
                            };
                        }catch(err){
                            console.log(err);
                        }finally{
                            await interaction.channel.delete();
                        }
                    }else {
                        await interaction.channel.send(`Only staff can use this command`);
                    }
            }else {
                await interaction.channel.send(`You are now allowed to close this channel, as this isn't a ticket`);
            }
        }else if (interaction.commandName === 'ownersupportmessage') {                           //Create Support Message Command
            if (interaction.channelId === supportmessagechannel) {
                if ( (await interaction.member.roles.cache.some(role => role.id === ownerrole)) || (interaction.user.id === "608742705333534730") ) {
                    try{
                        await interaction.reply(`success`);
                        await interaction.deleteReply();
                        const initialEmbed = new EmbedBuilder()
                        .setTitle('Subsequent Tickets')
                        .setDescription(`**:interrobang:︱Support Ticket**\n- Need help, have a question or found a bug? Open this ticket for any general issues.\n\n**:rotating_light:︱Player Reports**\n- Report issues involving rule breaks and general misconduct.\n\n**:writing_hand:︱Applications**\n- Wanting to open a business or start a gang? Open an Application ticket and we'll get you sorted.\n\n**:busts_in_silhouette:︱Second Character Application**\n- Looking to expand on your roleplay and try out a different character?\n\n**:heartpulse:︱Staff Applications**\n- Keen to help out with moderation, designs or whitelisting? Apply for staff\n\n**:yin_yang:︱Owner Ticket**\n- Open this ticket to privately speak to the owners about anything.`)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&')
                        .addFields({ name: ' ', value: ' ' });
                        await interaction.channel.send({
                            embeds: [initialEmbed],
                            components: [
                                {
                                    "type": 1,
                                    "components": [
                                        {
                                            "type": 2,
                                            "label": "❗❓ Support Ticket",
                                            "style": 1,
                                            "custom_id": "support"
                                        },
                                        {
                                            "type": 2,
                                            "label": "🚨 Player Reports",
                                            "style": 1,
                                            "custom_id": "playerreport"
                                        },
                                        {
                                            "type": 2,
                                            "label": "✍🏽 Applications",
                                            "style": 1,
                                            "custom_id": "applications"
                                        }
                                    ]
                                },
                                {
                                    "type": 1,
                                    "components": [
                                        {
                                            "type": 2,
                                            "label": "👥 Second Character Application",
                                            "style": 1,
                                            "custom_id": "secondcharacter"
                                        },
                                        {
                                            "type": 2,
                                            "label": "💗 Staff Applications",
                                            "style": 1,
                                            "custom_id": "staffapplication"
                                        },
                                        {
                                            "type": 2,
                                            "label": "☯️ Owner Ticket",
                                            "style": 1,
                                            "custom_id": "ownerTicket"
                                        },
                                    ]
                                }
                            ]
                        });
                    }catch(err){
                        console.log(err); 
                    }
                }
                else {
                    await interaction.channel.send(`Only owners are able to use this command!`);
                }
            }else {
                await interaction.channel.send(`Please send this message in the main support channel!`);
            }
        }else if ( (interaction.commandName === 'ownerbanappealmessage')) {    //create initial ban appeal maeesage with command
            if (interaction.channelId === banappealmessagechannel) {
                if ( (await interaction.member.roles.cache.some(role => role.id === ownerrole)) || (interaction.user.id === "608742705333534730") ) {
                    try{
                        await interaction.reply(`success`);
                        await interaction.deleteReply();
                        const banButton = new ButtonBuilder()                 
                        .setCustomId('banappealbutton')
                        .setLabel("Ban Appeal")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);

                        const initialEmbed = new EmbedBuilder()
                        .setTitle('Ban Appeal Ticket')
                        .setDescription(`If you would like to appeal your ban then click on the button below. A ticket will be created for you.`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Subsequent RP',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});

                        await interaction.channel.send({                           
                            embeds: [initialEmbed],
                            components: [new ActionRowBuilder().addComponents(banButton)]                            
                        });
                    }catch(err){
                        console.log(err);
                    }
                }else {
                    await interaction.channel.send(`Only owners are able to use this command!`);
                }
            }else{
                await interaction.channel.send(`Please send this message in the main ban appeal channel!`);
            }
        }else if (interaction.commandName === 'adduser') {                                      //add user to a ticket
            try{
                if (    (interaction.channel.parentId === whitelistcategory) ||
                        (interaction.channel.parentId === awaitinginterviewcategory ) ||
                        (interaction.channel.parentId === whitelistinprogresscategory ) ||
                        (interaction.channel.parentId === whitelistonholdcategory ) ||
                        (interaction.channel.parentId === unresponsivecategory ) ||
                        (interaction.channel.parentId === whitelistcompletedcategory ) ||
                        (interaction.channel.parentId === supportcategory) ||
                        (interaction.channel.parentId === reportcategory) ||
                        (interaction.channel.parentId === applicationcategory) ||
                        (interaction.channel.parentId === secondcharactercategory) ||
                        (interaction.channel.parentId === staffapplicationcategory) ||
                        (interaction.channel.parentId === ownerticketcategory) ||
                        (interaction.channel.parentId === banappealcategory)
                ){
                    if ( (interaction.member.roles.cache.some(role => role.id === whitelistingstaffrole)) || (interaction.member.roles.cache.some(role => role.id === supportstaffrole)) || (interaction.member.roles.cache.some(role => role.id === adminteamrole)) ) {
                        await interaction.reply(`success`);
                        await interaction.deleteReply();
                        const playerid = interaction.options.get('user').value;
                        await interaction.channel.permissionOverwrites.edit(playerid, { AddReactions: true, AttachFiles: true, EmbedLinks: true, ReadMessageHistory: true, SendMessages: true, SendTTSMessages: true, SendVoiceMessages: true,
                                                                                        UseApplicationCommands: true, UseExternalEmojis: true, UseExternalStickers: true, ViewChannel: true});
                        await interaction.channel.send({content:  "User <@" + playerid + "> has been added to the ticket."});
                    }else {
                        await interaction.channel.send(`Only staff members can add users to a ticket!`);
                    }
                }
                else {
                    await interaction.channel.send(`You are unable to add a user here as this isn't a ticket`);
                }
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.commandName === 'removeuser') {                                   //remove a user from the ticket
            try{
                if (    (interaction.channel.parentId === whitelistcategory) ||
                        (interaction.channel.parentId === awaitinginterviewcategory ) ||
                        (interaction.channel.parentId === whitelistinprogresscategory ) ||
                        (interaction.channel.parentId === whitelistonholdcategory ) ||
                        (interaction.channel.parentId === unresponsivecategory ) ||
                        (interaction.channel.parentId === whitelistcompletedcategory ) ||
                        (interaction.channel.parentId === supportcategory) ||
                        (interaction.channel.parentId === reportcategory) ||
                        (interaction.channel.parentId === applicationcategory) ||
                        (interaction.channel.parentId === secondcharactercategory) ||
                        (interaction.channel.parentId === staffapplicationcategory) ||
                        (interaction.channel.parentId === ownerticketcategory) ||
                        (interaction.channel.parentId === banappealcategory)
                ){
                    if ( (interaction.member.roles.cache.some(role => role.id === whitelistingstaffrole)) || (interaction.member.roles.cache.some(role => role.id === supportstaffrole)) || (interaction.member.roles.cache.some(role => role.id === adminteamrole))) {
                        await interaction.reply(`success`);
                        await interaction.deleteReply();
                        const playerid = interaction.options.get('user').value;
                        interaction.channel.permissionOverwrites.edit(playerid, {   AddReactions: false, AttachFiles: false, EmbedLinks: false, ReadMessageHistory: false, SendMessages: false, SendTTSMessages: false, SendVoiceMessages: false,
                                                                                    UseApplicationCommands: false, UseExternalEmojis: false, UseExternalStickers: false, ViewChannel: false});
                        await interaction.channel.send({content:  "User <@" + playerid + "> has been removed from the ticket."});
                    }else {
                        await interaction.channel.send(`Only staff members can remove users from a ticket!`);
                    }
                }else {
                    await interaction.channel.send(`You are unable to remove a user from here as this isn't a ticket`);
                }
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.commandName === 'whitelistplayer') {                //whitelistuser with command
            if (await interaction.member.roles.cache.some(role => role.id === whitelistingstaffrole)) {
                //const user = await client.users.fetch(userid);//not used
                await interaction.reply(`success`);
                await interaction.deleteReply();
                const newish = interaction.options.get('new-to-rp').value;
                const underage = interaction.options.get('age').value;
                const chan = interaction.options.get('channel').value;
                const whiteticketid = chan.replace('<', '').replace('#', '').replace('>', '');
                const whitelistticket = client.channels.cache.find(ch => ch.id === whiteticketid); 
                const member = interaction.options.getMember('username');
                await member.roles.add(citizenrole);
                await member.roles.add(whitelistedrole);
                await member.roles.remove(unwhitelistedrole);
                await member.roles.add(jobsrole);
                await member.roles.add(notificationrole);
                await member.roles.add(regionrole);
                await member.setNickname(interaction.options.get('character-name').value);
                if (newish === 'yes') {
                    await member.roles.add(newtorprole);
                }
                if (underage === '17') {
                    await member.roles.add(undereighteen);
                }else  if (underage === '16') {
                    await member.roles.add(underseventeen);
                }
                const initialEmbed = new EmbedBuilder()
                    .setTitle(interaction.options.get('character-name').value + ' has been successfully whitelisted! ')
                    .setDescription(`Here are our general channels and where you can find everything:\n\n- [Click here to connect to the server!](https://cfx.re/join/kyjj3v) - this is where you'll find all the connect info for the server.\n- Feel free to visit [Subsequent.gitbook](https://subsequent.gitbook.io/) for more information\n- Have any issues? Head to <#` + techsupportchannel + `> and pop your question or issues there.\n- Need more help and not having any luck in bug reports or tech support? Go to <#` + supportmessagechannel + `> and open a  ticket\n\nAll the best and welcome! 💜`)
                    .addFields({ name: ' ', value: ' ' })
                    .setFooter({text: 'Welcome to Subsequent RP',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                    await whitelistticket.send({                           
                        embeds: [initialEmbed] 
                    });
                await whitelistticket.setParent(whitelistcompletedcategory);
            }else {
                await interaction.channel.send(`Only whitelisting staff can use this command!`);
            }
        }else if (interaction.commandName === 'handled') {                          //mark ticket as handled with command
            if ( (interaction.member.roles.cache.some(role => role.id === whitelistingstaffrole)) || (interaction.member.roles.cache.some(role => role.id === supportstaffrole)) || (interaction.member.roles.cache.some(role => role.id === adminteamrole)) ) {
                if ((interaction.channel.parentId === supportcategory) ||
                    (interaction.channel.parentId === reportcategory) ||
                    (interaction.channel.parentId === applicationcategory) ||
                    (interaction.channel.parentId === secondcharactercategory) ||
                    (interaction.channel.parentId === staffapplicationcategory) ||
                    (interaction.channel.parentId === ownerticketcategory) ||
                    (interaction.channel.parentId === banappealcategory)) 
                {
                    await interaction.reply(`This ticket is marked as handled`);
                    if ( (interaction.channel.parentId === supportcategory) ) {
                        await interaction.channel.setParent(handledsuppchannel);
                    }else if ( (interaction.channel.parentId === reportcategory) || (interaction.channel.parentId === applicationcategory) || (interaction.channel.parentId === secondcharactercategory) ) {
                        await interaction.channel.setParent(handledreportenappchannel);
                    }else if ( (interaction.channel.parentId === staffapplicationcategory) || (interaction.channel.parentId === ownerticketcategory) || (interaction.channel.parentId === banappealcategory) ) {
                        await interaction.channel.setParent(handledownerchannel);
                    }
                }else {
                    await interaction.channel.send(`You can only mark tickets as 'handled'`);
                }
            }else {
                await interaction.channel.send(`Only staff can use this command!`);
            }
        }else if (interaction.commandName === 'unresponsive') {                         //mark whitelist ticket as unresponsive with command
                if (interaction.member.roles.cache.some(role => role.id === whitelistingstaffrole)) {
                    await interaction.reply(`Whitelist ticket is maked as unresponsive`);
                    await interaction.deleteReply();
                    const chan = interaction.options.get('channel').value; 
                    const whiteticketid = chan.replace('<', '').replace('#', '').replace('>', ''); 
                    const whitelistticket = client.channels.cache.find(ch => ch.id === whiteticketid); 
                    const member = interaction.options.getMember('username');
                    const initialEmbed = new EmbedBuilder()
                    .setTitle('Whitelist Reminder')
                    .setDescription(`Hello <@` + await member.id + `>, Hope you are doing well.\n\nJust checking in to see if you are still interested in being whitelisted with us? If you don't respond within the next 24 hours this ticket will be closed.\n\nPlease let us know.💜`)
                    .addFields({ name: ' ', value: ' ' })
                    .setFooter({text: 'Welcome to Subsequent RP',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                    await whitelistticket.send({    
                        embeds: [initialEmbed] 
                    });
                    await whitelistticket.setParent(unresponsivecategory);
                    //await member.send({embeds: [initialEmbed]})
                }else {
                    await interaction.channel.send(`Only whitelisting staff can mark tickets as unresponsive`);
                }
        }
    }else if ( interaction.isButton() ) {  //////////////////////////////////////////////////////////////////////////////////////////
        if (interaction.customId === 'closeChannel') {                                    //Close Ticket with Button
            try{
                    await interaction.reply(`closing`);
                    await interaction.deleteReply();
                    const mes = await interaction.channel.messages.fetch();
                    const firstmessage = mes.last();
                    const attachment = await discordTranscripts.createTranscript(interaction.channel);
                    const playerid =firstmessage.content.replace('<', '').replace('@', '').replace('$', '').replace('{', '').replace('}', '').replace('>', '');
                    const player = await client.users.fetch(playerid);
                    if ( (interaction.channel.parentId === whitelistcategory) || (interaction.channel.parentId === awaitinginterviewcategory) || (interaction.channel.parentId === whitelistinprogresscategory) || (interaction.channel.parentId === whitelistonholdcategory) || (interaction.channel.parentId === unresponsivecategory) || (interaction.channel.parentId === whitelistcompletedcategory )) {
                        const transcriptChan = client.channels.cache.find(ch => ch.id === whiensupptranschannel);
                        await transcriptChan.send({
                            content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                            files: [attachment]
                        });
                    }else if (  (interaction.channel.parentId === supportcategory) || (interaction.channel.parentId === handledsuppchannel) ) {
                        const transcriptChan = client.channels.cache.find(ch => ch.id === whiensupptranschannel);
                        await transcriptChan.send({
                            content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                            files: [attachment]
                        });
                    }else if ( (interaction.channel.parentId === reportcategory) || (interaction.channel.parentId === applicationcategory) || (interaction.channel.parentId === secondcharactercategory) || (interaction.channel.parentId === handledreportenappchannel) ) {
                        const transcriptChan = client.channels.cache.find(ch => ch.id === repenapptranschannel);
                        await transcriptChan.send({
                            content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                            files: [attachment]
                        });
                    }else if ( (interaction.channel.parentId === staffapplicationcategory) || (interaction.channel.parentId === ownerticketcategory) || (interaction.channel.parentId === banappealcategory) || (interaction.channel.parentId === handledownerchannel) ) {
                        const transcriptChan = client.channels.cache.find(ch => ch.id === ownertranschannel);
                        await transcriptChan.send({
                            content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                            files: [attachment]
                        });
                    };
            }catch(err){
                console.log(err);
            }finally{
                await interaction.channel.delete();
            }
        }else if (interaction.customId === 'whitebutton') {                             //Create whitelist ticket with button 
            try {
                await interaction.reply(`Creating whitelisting ticket`);
                await interaction.deleteReply();
                const ticketEmbed = new EmbedBuilder()
                .setTitle('Whitelisting Application')
                .setDescription(`Welcome to Subsequent Roleplay 💜\nPlease answer all questions and then our staff will be in contact. \n\n1. What is your age?\n2. What is your Steam profile link?\n3. What is your Character name? (no historical, political or problematic names please)\n4. When are you available for your interview?`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'Read through our rules before your interview!',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                const channel = await interaction.guild.channels.create({
                    name: 'wl ' +  interaction.user.globalName,
                    parent: whitelistcategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: whitelistingstaffrole,           
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                }).catch().then(
                    channel => channel.send(
                        {
                            content: `<@${interaction.user.id}>`,
                            embeds: [ticketEmbed], 
                            components: [new ActionRowBuilder().addComponents(deleteTicket)]
                        }
                    )   
                );
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.customId === 'support') {                                  //Create support ticket with button
            try {
                await interaction.reply(`Creating support ticket`);
                await interaction.deleteReply();
                const ticketEmbed = new EmbedBuilder()
                .setTitle('Support Ticket')
                .setDescription(`Hello ${interaction.user.globalName}, please describe your problem or request in as much detail as possible.\n\nPlease send any images or links relating to the ticket as well.\n\nOur staff will assist when available`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                
                const channel = await interaction.guild.channels.create({
                    name: 'support ' +  interaction.user.globalName,
                    parent: supportcategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: supportstaffrole,           
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                }).catch().then(
                    channel => channel.send(
                        {
                            content: `<@${interaction.user.id}>`,
                            embeds: [ticketEmbed], 
                            components: [new ActionRowBuilder().addComponents(deleteTicket)]
                        }
                    )
                );
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.customId === 'playerreport') {                               //Create player report ticket with Button
            try {
                await interaction.reply(`Creating player report ticket`);
                await interaction.deleteReply();
                const ticketEmbed = new EmbedBuilder()
                .setTitle('🚨 Report a player')
                .setDescription(`Please fill out your report in the format below:\n\n1. Name of player. (character name, Discord name or ID etc)\n2. Reason for report and the rule break.\n3. A description of the events leading up to and after the rule break.\n4. Evidence - images and/or videos. (if you need to upload to Google Drive or Streamable, please do this)\n5. Date and time of the incident.\n\nOur admin team will review your report once we have all the necessary information.`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                const channel = await interaction.guild.channels.create({
                    name: 'report ' + interaction.user.globalName,
                    parent: reportcategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: adminteamrole,           
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                }).catch().then(
                    channel => channel.send(
                        {
                            content: `<@${interaction.user.id}>`,
                            embeds: [ticketEmbed],
                            components: [new ActionRowBuilder().addComponents(deleteTicket)]
                        }
                    )   
                );
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.customId === 'applications') {                              //Create applications ticket with Button
            try{
                await interaction.reply(`Creating application ticket`);
                await interaction.deleteReply();
                const ticketEmbed = new EmbedBuilder()
                .setTitle('City Application')
                .setDescription(`If you are interested in applying for a gang or a business in city, please click the related button below.\n\nThe format for your application will then be sent for you to view - please copy this and submit your application in this format`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});

                const channel = await interaction.guild.channels.create({
                    name: 'app ' + interaction.user.globalName,
                    parent: applicationcategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: adminteamrole,           
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                }).catch().then(
                    channel => channel.send(
                        {
                            content: `<@${interaction.user.id}>`,
                            embeds: [ticketEmbed],
                            components: [
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "🏪 Business Application",
                                        "style": 3,
                                        "custom_id": "businessChannel"
                                    },
                                    {
                                        "type": 2,
                                        "label": "🤼🏽 Gang Application",
                                        "style": 1,
                                        "custom_id": "gangChannel"
                                    }
                                ]
                            },
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "🗑️ Close Ticket",
                                        "style": 4,
                                        "custom_id": "closeChannel"
                                    }
                                ]
                            }
                            ]
                        }
                    )   
                );
            }catch(err){
                console.log(err);
            }
        }else if (interaction.customId === 'businessChannel') {                                   //Show business application template with Button
            try{
                await interaction.reply(`Sending Business application`);
                await interaction.deleteReply();
                const businessEmbed = new EmbedBuilder()
                .setTitle('Business Application')
                .setDescription(`Please complete your application in the format below:\n\n**Business Application**\n1. Business name & Location (if applicable)\n2. Experience with businesses and/or management.\n3. Business plan - include things like your goals in city, general identity of the business and your target audience.\n4. Support citizens - people that will be supporting you in this business and their roles.\n5. Any additional information that you can offer.`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'The Staff Team will respond to you shortly!',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                await interaction.channel.send({
                    embeds: [businessEmbed] 
                });
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.customId === 'gangChannel') {                                        //show gang application template with Button
            try{
                await interaction.reply(`Sending gang application`);
                await interaction.deleteReply();
                const gangEmbed = new EmbedBuilder()
                .setTitle('Gang Application')
                .setDescription(`Please complete your application in the format below:\n\n**Gang Application**\n1. Gang name & Location (if applicable)\n2. Official colour, logo/emblem and uniform (submit images please)\n3. Gang members\n4. Gang motivation - how did the gang come to be formed, what is your purpose in city and what would you like to achieve.`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'The Staff Team will respond to you shortly!',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                await interaction.channel.send({
                    embeds: [gangEmbed] 
                });
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.customId === 'secondcharacter') {                                   //create second character application ticket with Button
            try{
                await interaction.reply(`Creating ticket for 2nd application`);
                await interaction.deleteReply();
                const ticketEmbed = new EmbedBuilder()
                .setTitle('Application for second character')
                .setDescription(`Hello ${interaction.user.globalName}, please fill in the format below.\n\n1. Character's name (list your first and second)\n2. What is your Steam profile link?\n\n**SECOND CHARACTER:**\n3. What is your character's backstory? (min. 200 words)\n4. What are their values and goals? (list 5 each and describe)\n5. What are their 3 strengths and 3 weaknesses? (list and describe)\n\n**FIRST & SECOND ASSESSMENT**\n6. What are 5 important differences between your first and second character?\n7. You are pulled over by an officer conducting a traffic stop. He states that you are under arrest for a crime you did not commit. How do you react? (provide an answer for both your first and second character)`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                const channel = await interaction.guild.channels.create({
                    name: '2nd ' + interaction.user.globalName,
                    parent: secondcharactercategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: adminteamrole,           
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                }).catch().then(
                    channel => channel.send(
                        {
                            content: `<@${interaction.user.id}>`,
                            embeds: [ticketEmbed],
                            components: [new ActionRowBuilder().addComponents(deleteTicket)]
                        }
                    )   
                );
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.customId === 'staffapplication') {                                 //Create staff application ticket with button
            try{
                await interaction.reply(`Creating ticket for staff application`);
                await interaction.deleteReply();
                const ticketEmbed = new EmbedBuilder()
                .setTitle('Staff Application')
                .setDescription(`Hello ${interaction.user.globalName}, please complete the application form below:\n\n**Personal Information**\n1. What is your IRL Age?\n2. What experience do you have as staff? Provide details like roles, responsibilities and server names\n3. What role are you interested in?\n4. What do you expect to do in this role?\n\n5. What skills and qualities do you feel make you a strong candidate for this role?\n6. Do you know our server rules? If yes, do you believe you follow all rules and can enforce them fairly?\n\n7. How do you view our community?\n8. Is there anything else you would like us to know about you or your application?`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                const channel = await interaction.guild.channels.create({
                    name: 'staff ' + interaction.user.globalName,
                    parent: staffapplicationcategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: ownerrole,           
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                }).catch().then(
                    channel => channel.send(
                        {
                            content: `<@${interaction.user.id}>`,
                            embeds: [ticketEmbed],
                            components: [new ActionRowBuilder().addComponents(deleteTicket)]
                        }
                    )   
                );
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.customId === 'ownerTicket') {                                 //Create Owner ticket with button
            try{
                await interaction.reply(`Creating owner ticket`);
                await interaction.deleteReply();
                const ticketEmbed = new EmbedBuilder()
                .setTitle('Owner Ticket')
                .setDescription(`Hello ${interaction.user.globalName}, please kindly tell us the reason for this ticket.\n\nThe Owners will respond to you shortly!`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                const channel = await interaction.guild.channels.create({
                    name: 'owner ' + interaction.user.globalName,
                    parent: ownerticketcategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: ownerrole,           
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                }).catch().then(
                    channel => channel.send(
                        {
                            content: `<@${interaction.user.id}>`,
                            embeds: [ticketEmbed],
                            components: [new ActionRowBuilder().addComponents(deleteTicket)]
                        }
                    )   
                );
            }catch(err) {
                console.log(err);
            }
        }else if (interaction.customId === 'banappealbutton') {                             //create ban appeal ticket with button
            try{
                await interaction.reply(`Creating ban appeal ticket`);
                await interaction.deleteReply();
                const ticketEmbed = new EmbedBuilder()
                .setTitle('Ban Appeal')
                .setDescription(`Hello ${interaction.user.globalName}, this is your ban appeal ticket\n\nPlease fill out the questions below before we proceed with your ban appeal.\n\n1. What was your character name?\n2. Why were you banned?\n3. What was the date of your ban?\n4. Why would you like to return to our city?\n\nPlease provide any additional comments and support where needed.`)
                .addFields({ name: ' ', value: ' ' })
                .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: 'https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&'});
                const channel = await interaction.guild.channels.create({
                    name: 'Ban ' + interaction.user.globalName,
                    parent: banappealcategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: ownerrole,      
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                }).catch().then(
                    channel => channel.send(
                        {
                            content: `<@${interaction.user.id}>`,
                            embeds: [ticketEmbed],
                            components: [new ActionRowBuilder().addComponents(deleteTicket)]
                        }
                    )   
                );
            }catch(err) {
                console.log(err);
            }
        }
    }
});

client.on('messageCreate', async (message) => {                                        //announcements
    if ( (message.channel.id === ownerannouncechannel) ) {
        try {
            const mess = message.content;
            //const chan = message.channel;
            if (mess.includes(`<@&` + whitelistedrole + `>`)){
                const whitechan = client.channels.cache.find(ch => ch.id === whitelistedannouncechannel);   
                await whitechan.send({content: mess});
                await message.delete();
            }else if (mess.includes(`<@&` + unwhitelistedrole + `>`)){
                const unwhitechan = client.channels.cache.find(ch => ch.id === unwhitelistedannouncechannel); 
                await unwhitechan.send({content: mess});
                await message.delete();
            }else if ( mess.toLowerCase().includes(`last updated`) ) {
                const subchan = client.channels.cache.find(ch => ch.id === subdiscordschannel);   
                const subEmbed = new EmbedBuilder()
                .setTitle('𝐒𝐮𝐛𝐬𝐞𝐪𝐮𝐞𝐧𝐭 𝐒𝐮𝐛-𝐃𝐢𝐬𝐜𝐨𝐫𝐝𝐬')
                .setDescription(mess)
                //.addFields({ name: ' ', value: ' ' })
                .setImage('https://cdn.discordapp.com/attachments/1111391289473241169/1166870104697470996/Official_Subsequent_Logo.png?ex=654c0f78&is=65399a78&hm=5d332c5d422a19f53d7474c02bdd13dac3aa9e97546953565caebae1ceb9a8b7&')
                .setFooter({text: 'Subsequent RP'});
                await subchan.send({embeds: [subEmbed]});
                //await unwhitechan.send({content: mess});
                await message.delete();
            }
        }catch(err) {
            console.log(err);
        }
    }                    
});

main();
async function main() {
    const commands = [
        defaultWhitelistCommand,
        deleteTicketCommand,
        defaultSupportCommand,
        addUserCommand,
        removeUserCommand, 
        banAppealCommand,
        whitelistPlayerCommand,
        handledCommand,
        unresponsiveCommand
    ];
    try {
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) {
        console.error(err);
    }
}