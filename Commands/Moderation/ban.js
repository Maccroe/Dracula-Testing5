const { Client, ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js")
const ms = require("ms")
const EditReply = require("../../Systems/EditReply")

module.exports = {
  name: "ban",
  description: "Ban a member from the server",
  UserPerms: ["BanMembers"],
  BotPerms: ["BanMember"],
  category: "Moderation",
  options: [
    {
      name: "user",
      description: "Select the user",
      type: 6,
      required: true
    },
    {
      name: "reason",
      description: "Provide a reason",
      type: 3,
      required: false 
    }
  ],
 
  /**
* @param {Client} client
* @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {

  await interaction.deferReply({ ephemeral: true })

    const { options, user, guild } = interaction

    const member = options.getMember("user")
    const reason = options.getString("reason") || "no reason provided"

    if (member.id === user.id) return EditReply(interaction, "❌", `You can't ban yourself!`)
    if (guild.ownerId === member.id) return EditReply(interaction, "❌", `You can't ban the server owner!`)
    if (guild.members.me.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "❌", `You can't ban a member of your same level or higher!`)
    if (interaction.member.roles.highest.position <= member.roles.highest.position) return EditReply (interaction, "❌", `I can't ban a member of my same level or higher!`)

   const Embed = new EmbedBuilder()
    .setColor(client.color)

   const row = new ActionRowBuilder().addComponents(

     new ButtonBuilder()
     .setStyle(ButtonStyle.Danger)
     .setCustomId("ban-yes")
     .setLabel("Yes"),

     new ButtonBuilder()
     .setStyle(ButtonStyle.Primary)
     .setCustomId("ban-no")
     .setLabel("No"),

   )

   const Page = await interaction.editReply({

   embeds: [
     Embed.setDescription(`**⚠ | Do you really want to ban this member?**`)
   ],
     components: [row]
     
   })
   const target = options.getUser("user")


   const col = await Page.createMessageComponentCollector({
     componentType: ComponentType.Button,
     time: ms("15s")
   })

   col.on("collect", i => {

   if (i.user.id !== user.id) return

     switch(i.customId){

       case "ban-yes": {

         member.ban({ reason })

         interaction.editReply({
         embeds: [
           Embed.setDescription(`✅ | ${member} has been banned for : **${reason}**`)
         ],
         components: []
           
         })

         member.send({
           embeds: [
             new EmbedBuilder()
             .setColor(client.color)
             .setTitle('🔨 | You have been Banned!')
.setThumbnail(target.displayAvatarURL())
	.addFields(
		{ name: 'Name:', value: `${member.user.tag}`, inline: false },
		{ name: 'Banned From:', value: `${guild.name}`, inline: false },
		{ name: 'Reason:', value: `${reason}`, inline: false },
    { name: 'Responsible Moderator:', value: `${user.tag}`, inline: false },
	)
	.setTimestamp()
	.setFooter({ text: `Banned by Drago` })
           ]
         }).catch(err => {

        if (err.code !== 50007) return console.log(err)
           
         })
         
       }
         break;

       case "Ban-no": {

       interaction.editReply({
         embeds: [
           Embed.setDescription(`✅ | Ban request cancelled`)
         ],
         components: []
       })
         
       }
         break;
         
     }
     
   })

    col.on("end", (collected) => {
    
    if (collected.size > 0) return

      interaction.editReply({
         embeds: [
           Embed.setDescription(`❌ | You didn't provide a valid response in time!`)
         ],
         components: []
      })

})
    
  }
}