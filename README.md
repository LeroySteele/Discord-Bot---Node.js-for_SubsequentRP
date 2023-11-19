# Discord-Bot---Node.js-for_SubsequentRP


This is a Discord ticket bot in node.js created for an 18+ GTA5 RP discord server used to help moderate and automate work done by server staff. The bot supports slash commands, button functionality and observes messages sent in the guild to perform certain tasks.

`Resources used:`
-https://discord.com/developers/applications
-https://emojipedia.org/
-https://discord.js.org/
-https://www.npmjs.com/

**To host the bot online I used Discloud (thats the purpose of the Discloud.config file)**
-https://discloudbot.com/

`Steps:`


-Open CMD and create a folder then /cd into the folder. Then download all the npm packages by using these commands
  npm init -y
  npm i discord.js
  npm i -D dotenv
  npm i -D nodemon
  npm i discord-html-transcripts
  npm i @discordjs/rest
  npm install @discordjs/builders

-Pull the files from Github

-To make the bot work you should create all the reletaive channels and roles in discord then update all the ID's .

-If you host it locally use "npm run start:dev" in the terminal to start the bot.

-If you host using Discloud update the bot ID in Discloud.config and then upload the files to Dicloud.com or through the dicloud discord guild (always exclude the node_module folder when uploading).

`Commands`


"/ownerwhitelistmessage" - Used to create the initial message where users can click a button to open a whitelist ticket. This command can only be run by people with the 'owner' role and it can only be run in the 'whitelist' channel).

"/ownersupportmessage" - Used to create the initial message where users can click a button to open a support ticket (there are many types of support tickets). This command can only be run by people with the 'owner' role and it can only be run in the 'support' channel.

"/ownerbanappealmessage" - Used to create the initial message where users can click a button to open a ban appeal ticket. This command can only be run by people with the 'owner' role and it can only be run in the 'ban appeal' channel).



"/closeticket" - Used to close any ticket, it must get run in the ticket you want to close then it creates and sends a transcript of the ticket to the transcript channel.

"/adduser" - When a ticket is created only staff and the ticket user can see the ticket. This command allows staff to add another user to the ticket. It can only be used by staff and can only be used in tickets.

"/removeuser" - When a ticket is created only staff and the ticket user can see the ticket. This command allows staff to remove the additional member from the ticket. It can only be used by staff and can only be used in a tickets.

"/whitelistplayer" - Once a user goes through the interview process this command can be used to update the users username and roles. This command can only be used by staff, it can be run anywhere as long as the correct username and channel name is used in the command.

"/handled" - Once is ticket is dealt with by staff members, this command can be used to mark it as handled (moves it to another discord category). Then it can reviewed by other staff members before being closed. This command can only be used by staff members and must be used it the target channel.

"/unresponsive" - If a user opens a ticket and stops responding over time then an alert can be sent using the bot to remind the user of their ticket.


`Bot Announcements`

To send an announcement from the bot, navigate to the 'announcement maker' channel. In this bot there are 3 types of announcements (Whitelisted, Unwhitelisted, Sub-discords). Your message must include 1 of 3 keywords - "@whitelisted", "@Unwhitelisted", "LastUpdated: " - to select where you want to make an announcement to.


`Buttons`

All buttons create their respective tickets only allowing staff and the 'user who created the ticket' to see/interact with the ticket, including (whitebutton, support, playerreport, applications, businessChannel, gangChannel, secondcharacter, staffapplication, ownerTicket, banappealbutton)

The 'Close ticket' button does the same as the "/close" command, where it closes the ticket and creates/sends a ticket transcript to the transcript channel
