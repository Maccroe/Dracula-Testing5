const { Client, ContextMenuCommandInteraction, ApplicationCommandType, EmbedBuilder } = require("discord.js")

module.exports = {
  name: "Banner",
  type: ApplicationCommandType.User,
  context: true,
  category: "Context",

/**
  * @param {ContextMenuCommandInteraction} interaction
  * @param {Client} client
  */
  async execute (interaction, client) {
    
  await interaction.deferReply({ ephemeral: true })
    
    const { guild, targetId } = interaction

    const target = await guild.members.cache.get(targetId)

    const Embed = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({ name: `${target.user.username}'s Banner`, iconURL: target.user.bannerURL() })
    .setImage(target.user.bannerURL({ size: 512 }))
    .setFooter({ text: "Banner by Drago" })
    .setTimestamp()

    return interaction.editReply({ embeds: [Embed] })

  }
}