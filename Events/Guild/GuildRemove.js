const { Client, Guild, EmbedBuilder, CommandInteraction } = require("discord.js")

module.exports = {
  name: "guildDelete",

  /**
    * @param {Guild} guild 
    */
  async execute(guild) {

  const logsChannel = guild.client.channels.cache.get("1015708316195893398")

  const { client, name, id, memberCount, ownerId } = guild

  const ownerName = client.users.cache.get(ownerId).tag
  const size = client.guilds.cache.size

  const logrmvEmbed = new EmbedBuilder()
  .setColor(client.color)
  .setTitle("🔥 | Removed from Server!")
  .setThumbnail(guild.iconURL({ dynamic: true }))
  .addFields([
    { name: "Guild Info", value: `${name} (${id}) | **${memberCount} members!**` },
    { name: "Owner Info", value: `<@${ownerId}> (${ownerId}) | ${ownerName}` }
  ])
  .setFooter({ text: `Currently in ${size} Servers` })
  .setTimestamp()

  logsChannel.send({ embeds: [logrmvEmbed] })
  
  }
}