const { Client, GuildMember, EmbedBuilder } = require("discord.js")
const DB = require("../../Structures/Schemas/Welcome")

module.exports = {
  name: "guildMemberAdd",

  /**
  * @param {GuildMember} member
  * @param {Client} client
    */
  async execute(member, client) {

    const { user, guild } = member

    const Data = await DB.findOne({ Guild: guild.id }).catch(err => { })
    if (!Data) return

    const Message = `${user}`

    let dmMsg

    if (Data.DMMessage !== null) {

    var dmMessage = Data.DMMessage.content

      if (dmMessage.length !== 0) dmMsg = dmMessage
      else dmMsg = Message

    }else dmMsg = Message

    if (Data.Channel !== null) {

    const Channel = guild.channels.cache.get(Data.Channel)
      if (!Channel) return

      const Embed = new EmbedBuilder()
      .setTitle("🏝 | Welcome Martsko")
      .setColor(client.color)
      .setDescription(`Hello ${member}, welcome to **${guild.name}**!\nGet your desired roles from <#1012056533363859466>.Get the ping roles to stay updated. Have a great day! :)\n\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMember Count: \`${guild.memberCount}\``)
      .setThumbnail(user.displayAvatarURL())
      .setFooter({ text: `ID: ${user.id}` })
      .setTimestamp()

      Channel.send({ content: `${Message}`, embeds: [Embed] })

  }

    if (Data.DM === true) {
    
    const Embed = Data.DMMessage.embed

      if (Data.Content === true && Data.Embed === true) {

      const Sent = await member.send({ content: `${dmMsg}` }).catch(err => {

       if (err.code !== 50007) return console.log(err)
        
      })

     if (!Sent) return
     if (Embed) Sent.edit({embeds:[Embed]})
        
      } else if (Data.Content === true && Data.Embed !== true) {

      const Sent = await member.send({ content: `${dmMsg}` }).catch(err => {

       if (err.code !== 50007) return console.log(err)
        
      })
        
      } else if (Data.Content !== true && Data.Embed === true) {

      const Sent = await member.send({ content: `${dmMsg}` }).catch(err => {

       if (err.code !== 50007) return console.log(err)
        
      })
        
        } else return 

    }

  }
}