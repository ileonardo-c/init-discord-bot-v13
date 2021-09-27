/** @format */
const { ClientEvents } = require('discord.js')
const Client = require('./Client.js')

/**
 * @template {keyof ClientEvents} K
 * @param {Client} client
 * @param {ClientEvents[K]} eventArgs
 */
function RunFunction(client, ...eventArgs) {}

/**
 * @template {keyof ClientEvents} K
 */
class BaseEvent {
  /**
   * @param {K} event
   * @param {RunFunction<K>} runFunction
   */
  constructor(event, runFunction) {
    this.event = event
    this.run = runFunction
  }
}

module.exports = BaseEvent
