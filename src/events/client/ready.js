const { Client, Events, ActivityType } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * 
     * @param { Client } client 
     */
    async execute(client) {

        const { user } = client;

        // Bot Login
        console.log(`${user.tag} is online!`);


        // Bot Status
        setInterval(() => {

            user.setActivity({
                name: `Automod`,
                type: ActivityType.Playing
            });

        }, ms("5s"));
    }
};