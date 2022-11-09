const { Client, ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")
const DB = require("../../Structures/Schemas/Verification")
const EditReply = require("../../Systems/EditReply")

module.exports = {
  name: "verify",
  description: "Inbuilt Verification System for Discord Server",
  UserPerms: ["ManageGuild"],
  category: "Moderation",
  options: [
    {
      name: "role",
      description: "Select the Verified Members Role",
      type: 8,
      required: true
    },
    {
      name: "channel",
      description: "Select the channel where you want to send this",
      type: 7,
      required: false
    }
  ],
  
  /**
* @param {Client} client
* @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {

   await interaction.deferReply({ ephemeral: true })

    const { options, guild, channel } = interaction

    const role = options.getRole("role")
    const Channel = options.getChannel("channel") || channel

    let Data = await DB.findOne({ Guild: guild.id }).catch(err => { })

    if (!Data) {

    Data = new DB({
      Guild: guild.id,
      Role: role.id
    })

      await Data.save()

    } else {

     Data.Role = role.id
      await Data.save()
      
    }

    Channel.send({

      embeds: [
        new EmbedBuilder()
        .setColor(client.color)
        .setTitle("✅ | Verification")
        .setDescription(`Click the button below to verify yourself as a member of ${guild.name}. If somehow, it seems not to be working, contact the owner.`)
        .setThumbnail(guild.iconURL())
        .setFooter({ text: `Verification by Drago` })
        .setTimestamp()
      ],
      components: [
        new ActionRowBuilder().addComponents(

          new ButtonBuilder()
          .setCustomId("verify")
          .setLabel("Verify")
          .setStyle(ButtonStyle.Secondary)

        )
      ]
 
    });
      const Embed = new EmbedBuilder()
.setColor(client.color)

    interaction.editReply({
         embeds: [
           Embed.setTitle(`✅ | Verification System`)
           .setDescription(`Make sure to follow these steps after initializing the verification system.\n\n1. Disable all the permissions for @everyone role in your Discord Server Roles Settings.
2. If you have a Welcome Role Enabled, disable all the permissions for that role also.
3. Move the <@&${role.id}> roles on top of the Welcome Role. The order should be like this, @everyone < Welcome Role < <@&${role.id}> < ... < Owner < ....
4. Turn on the basic permission for the <@&${role.id}>.
5. Customize the ${Channel} permission, so that @everyone could only see that channel after joining the server.`)
          .setThumbnail(guild.iconURL())
             .setFooter({ text: `Verification by Drago` })
             .setTimestamp()
         ],
    })
    
  }
}