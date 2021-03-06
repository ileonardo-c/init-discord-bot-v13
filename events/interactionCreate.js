const Event = require('../scripts/Event.js')

module.exports = new Event('interactionCreate', (client, interaction) => {
  if (interaction.user.bot || !interaction.isCommand() || !interaction.guild)
    return

  // config
  const args = [
    interaction.commandName,
    ...client.commands
      .find((cmd) => cmd.name.toLowerCase() == interaction.commandName)
      .slashCommandOptions.map(
        (v) => `${interaction.options.get(v.name).value}`,
      ),
  ]

  const command = client.commands.find(
    (cmd) => cmd.name.toLowerCase() == interaction.commandName,
  )

  // validation
  if (!command) return interaction.reply('That is not a valid command!')

  const permission = interaction.member.permissions.has(command.permission)

  if (!permission)
    return interaction.reply(
      'You do not have the correct permissions to run this command!',
    )

  // query
  command.run(interaction, args, client)
})
