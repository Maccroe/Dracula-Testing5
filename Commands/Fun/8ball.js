const { Client, CommandInteraction, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "8ball",
    description: "Ask the bot a question..",
    category: "Fun",
    options: [
        {
            name: "question",
            description: "Question",
            required: true,
            type: 3
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

    const message = interaction.options.getString('question');

    let respostas = ["Yes.", "No", "It is certain.", "Perhaps", "Obviously", "It is decidedly so.", "Without a doubt.", "Yes definelty.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now...", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "I do not think so", "Of course", "Outlook not so good...", "Very doubtful.", "That is SuS"];

    const ball = new EmbedBuilder()
        .setColor(client.color)
        .setTitle("**:8ball: 8BALL**")
        .setFooter({ text: `Executed by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .addFields({ name: `» Question`, value: ` ${message}`, inline: false})
        .addFields({ name: `» Answer:`, value: ` ${respostas[( Math.floor(Math.random() * respostas.length))]}.`, inline: false})
        interaction.reply({ embeds : [ball] })

    }
}