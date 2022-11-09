const { Client, ChatInputCommandInteraction } = require("discord.js")
const EditReply = require("../../Systems/EditReply")

module.exports = {
    name: "role",
    description: "Give or remove role from a member or everyone",
    UserPerms: ["ManageRoles"],
    BotPerms: ["ManageRoles"],
    category: "Moderation",
    options: [
        {
            name: "topic",
            description: "Select the option",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Give",
                    value: "give"
                },
                {
                    name: "Remove",
                    value: "remove"
                },
                {
                    name: "Give All",
                    value: "give-all"
                },
                {
                    name: "Remove All",
                    value: "remove-all"
                },
            ]
        },
        {
            name: "role",
            description: "Select the role to be managed",
            type: 8,
            required: true
        },
        {
            name: "user",
            description: "Select the user to manage roles",
            type: 6,
            required: false
        }
    ],

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        const { options, guild, member } = interaction

        const Options = options.getString("topic")
        const Role = options.getRole("role")
        const Target = options.getMember("user") || member

        if (guild.members.me.roles.highest.position <= Role.position) return EditReply(interaction, "❌", "I can't execute this command, please move me higher than the role in `ROLES`!")

        switch (Options) {

            case "give": {

                if (guild.members.me.roles.highest.position <= Role.position) return EditReply(interaction, "❌", "I can't execute this command, please move me higher than the role in `ROLES`!")

                if (Target.roles.cache.find(r => r.id === Role.id)) return EditReply(interaction, "❌", `${Target} already has **${Role.name}** role!`)

                await Target.roles.add(Role)

                EditReply(interaction, "✅", `${Target} now has **${Role.name}** role`)

            }
                break;
            
            case "remove": {

                    if (guild.members.me.roles.highest.position <= Role.position) return EditReply(interaction, "❌", "I can't execute this command, please move me higher than the role in `ROLES`!")
    
                    if (!Target.roles.cache.find(r => r.id === Role.id)) return EditReply(interaction, "❌", `${Target} doesn't have **${Role.name}** role!`)
    
                    await Target.roles.remove(Role)
    
                    EditReply(interaction, "✅", `${Target} has lost **${Role.name}** role`)
                    
                }
                    break;

                case "give-all": {
                    
                        const Members = guild.members.cache.filter(m => !m.user.bot)
        
                        EditReply(interaction, "✅", `Given <@&${Role.id}> to all the member on this server`)
                        
                        await Members.forEach(m => m.roles.add(Role))

                    }
                        break;

                    case "remove-all": {

                            const Members = guild.members.cache.filter(m => !m.user.bot)
            
                            EditReply(interaction, "✅", `Removed <@&${Role.id}> from every member on this server`);
                            
                            await Members.forEach(m => m.roles.remove(Role))
                    }
                     break;
                
                
        }


    }
}