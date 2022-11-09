const { Client, Guild, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const ms = require("ms")

module.exports = {
   name: "guildCreate",

  /**
  * @param {Guild} guild
  * @param {Client} client
    */
  async execute(guild, client) {

 const { name, members, channels } = guild

    let channelToSend 

    channels.cache.forEach(channel => {

    if (channel.type === ChannelType.GuildText && !channelToSend && channel.permissionsFor(members.me).has("SendMessages")) channelToSend = channel
      
    })

    if (!channelToSend) return

    const Embed = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({ name: name, iconURL: guild.iconURL() })
    .setDescription("Hey, this is **Drago**! Thanks for inviting me to your server.Type `/` and click on my logo to see all of my commands.I'll be happy to help you all out!")
    .setFooter({text: "Developed by Adeeb#9765"})
    .addFields(
		{ name: 'Need help?', value: "Check out [Drago's Dashboard](https://Dracula-Testing.hiby.repl.co)", inline: false },)
    .setTimestamp()

    const Row = new ActionRowBuilder().addComponents(

          new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL("https://Dracula-Testing.hiby.repl.co/invite")
          .setLabel("Invite Me"),

          new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL("https://Dracula-Testing.hiby.repl.com")
          .setLabel("Status"),

          new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL("https://Dracula-Testing.hiby.repl.co")
          .setLabel("Dashboard"),


        )

    channelToSend.send({ embeds: [Embed], components: [Row] })
    
  }
}