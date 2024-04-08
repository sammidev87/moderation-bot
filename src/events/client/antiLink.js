const { Client, Message, EmbedBuilder, Events } = require("discord.js");
const moderationDB = require("../../schemas/moderationDB");
const colorDB = require("../../schemas/colorDB");

module.exports = {
    name: Events.MessageCreate,

    /**
     * 
     * @param { Message } message 
     * @param { Client } client 
     */
    async execute(message, client) {

        const { content, guild } = message;
        const { emojilist, color } = client;
        const colorData = await colorDB.findOne({ Guild: guild.id }).catch(err => console.error(err));
        let embedColor;
        if (!colorData) {
            embedColor = color;
        } else {
            embedColor = colorData.Color;
        }

        // Anti Link
        const data = await moderationDB.findOne({ Guild: guild.id }).catch(err => console.error(err));
        if (!data) return;
        const whiteList = data.Whitelist.map((str) => str.split(",")[1].join(" || "))
        if (content.includes(whiteList)) return;
        else if (content.startsWith('http') || content.startsWith('discord.gg') || content.includes('https://') || content.includes('http://') || content.includes('discord.gg/')) {

            const Embed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle(`${emojilist.cross} No Links Allowed!`)
                .setDescription("The safe word has been spoken! Please change the subject of the conversation and an admin will be here shortly to handle the situation.")
                .setFooter({ text: "Safe Word by Bun Bot" })
                .setTimestamp();

            message.channel.send({ embeds: [Embed] })

            message.delete();
        }

    }

};