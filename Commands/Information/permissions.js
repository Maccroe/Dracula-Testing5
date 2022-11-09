const { Client, EmbedBuilder, CommandInteraction, PermissionsBitField } = require("discord.js")
const permissions = new PermissionsBitField(268550160n);

module.exports = {
  name: "permissions",
  description: "Displays rank card",
  category: "Community",
  options: [
    {
      name: "user",
      description: "Select a user",
      required: false,
      type: 6
    }
  ],

  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  async execute(interaction, client) {

    const { options, user, channel } = interaction

    const member = options.getMember("user") || interaction.user

    let text = `Permissions of ${member}` + "```"

    const mPermissions = channel.permissionsFor(member)

    const total = {
      denied: 0,
      allowed: 0
    }

    permissions.forEach((perm) => {

      if (!mPermissions.has(perm)) {

        text += `${perm} ❌ \n`;
        total.denied++;
        
      } else {

        text += `${perm} ✅ \n`;
        total.allowed++;
        
      }

    })

    text += `\n${total.allowed} ✅ | ${total.denied} ❌` + "\n```"

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor(client.color)
        .setTitle("PERMISSIONS")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(text)
        .setTimestamp()
        .setFooter({ text: "Permissions by Drago" })
      ]
    })
    
  }
}