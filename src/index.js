const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config();
const { connect, set } = require("mongoose");
const { token, mongoDbUrl } = process.env;
const configuration = require("../config.json");
const ms = require("ms");
const fs = require("fs");

// Create New Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.User,
        Partials.GuildScheduledEvent,
    ],
    allowedMentions: { parse: [ "everyone", "roles", "users" ] },
    rest: { timeout: ms("1m") },
});

// Collections
client.commands = new Collection();
client.commandArray = [];
client.config = configuration;
client.color = "#ffc0cb";

// Function Folders Loader
const functionFolders = fs.readdirSync(`./src/functions`);
for (const functionFolder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${functionFolder}`).filter(file => file.endsWith(`.js`));

    for (const functionFile of functionFiles) require(`./functions/${functionFolder}/${functionFile}`)(client);
}

// Command Event Handlers
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Client Login
client.login(token);

// MongoDB Login
(async () => {
    set("strictQuery", false);
    await connect(mongoDbUrl).catch(console.error);
})();