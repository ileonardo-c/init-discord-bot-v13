/** @format */
const { Intents, Client, Collection } = require('discord.js')
const Command = require('./Command.js')
const Event = require('./Event.js')

// config
const fs = require('fs')

const intents = new Intents([
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
])

class BaseClient extends Client {
  constructor() {
    super({ intents })

    /** @type {Collection<string, Command>}*/
    this.commands = new Collection()

    /** @type String*/
    this.prefix = process.env.PREFIX

    /** @type String*/
    this.guildId = process.env.GUILD_ID
  }

  /** @param {String} token */
  start(token) {
    // command handler
    // ------------------------------------------------------------------------------
    const commandFiles = fs
      .readdirSync('./commands')
      .filter((file) => file.endsWith('.js'))

    /** @type {Command[]} */
    const commands = commandFiles.map((file) => require(`../commands/${file}`))

    const slashCommands = commands
      .filter((cmd) => ['BOTH', 'SLASH'].includes(cmd.type))
      .map((cmd) => ({
        name: cmd.name.toLowerCase(),
        description: cmd.description,
        permissions: cmd.permissions,
        options: cmd.slashCommandOptions,
        defaultPermission: cmd.defaultPermission,
      }))

    commands.forEach((cmd) => {
      this.commands.set(cmd.name, cmd)
      console.log(`Command ${cmd.name} loaded`)
    })

    this.once('ready', async () => {
      const guild = this.guilds.cache.get(this.guildId)
      let commands

      if (guild) {
        commands = guild.commands
      } else {
        commands = this.application.commands
      }

      const cmds = await commands.set(slashCommands)
      cmds.forEach((cmd) => console.log(`Slash Command ${cmd.name} registered`))

      console.log(`Logged in as ${this.user.tag}!`)
    })

    // event handler
    // ------------------------------------------------------------------------------
    fs.readdirSync('events')
      .filter((file) => file.endsWith('.js'))
      .forEach((file) => {
        /** @type {Event}*/
        const event = require(`../events/${file}`)

        console.log(`Event ${event.event} loaded`)
        this.on(event.event, event.run.bind(null, this))
      })

    // Login to Discord with your client's token
    // ------------------------------------------------------------------------------
    this.login(token)
  }
}

module.exports = BaseClient
