const { Client, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const colorDB = require("../../schemas/colorDB");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete up to 100 messages.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption(opt => opt.setName("amount").setDescription("Amount of messages you want deleted.").setRequired(true)),

    /**
     * 
     * @param { ChatInputCommandInteraction } interaction 
     * @param { Client } client 
     */
    async execute(interaction, client) {

        const { options, channel, member, guild } = interaction;
        const { color } = client;
        const colorData = await colorDB.findOne({ Guild: guild.id }).catch(err => console.error(err));
        let embedColor;
        if (!colorData) {
            embedColor = color;
        } else {
            embedColor = colorData.Color;
        }

        const amount = options.getNumber("amount");
        if (amount >= 101) return interaction.reply({ content: `You can only delete up to 100 messages at a time!`, ephemeral: true });

        const msgs = await channel.messages.fetch({ limit: amount });
        msgs.forEach((message) => message.delete());

        const Embed = new EmbedBuilder()
            .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
            .setColor(embedColor)
            .setTitle("Clear Messages")
            .setDescription(`✅ | Successfully deleted ${amount} messages!`)
            .setFooter({ text: "Clear Messages by Bun Bot" });

        interaction.reply({ embeds: [ Embed ] });

    }
};