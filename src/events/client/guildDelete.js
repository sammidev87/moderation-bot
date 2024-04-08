const { Client, Guild, Events } = require("discord.js");
const safeWordDB = require("../../schemas/safeWordDB");
const colorDB = require("../../schemas/colorDB");

module.exports = {
    name: Events.GuildDelete,

    /**
     * 
     * @param { Guild } guild
     * @param { Client } client 
     */
    async execute(guild, client) {

        colorDB.deleteMany({ Guild: guild.id }).catch(err => console.error(err));
        safeWordDB.deleteMany({ Guild: guild.id }).catch(err => console.error(err));

    }
};