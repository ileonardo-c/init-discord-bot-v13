// init
const Client = require('./scripts/Client.js')
const dotenv = require('dotenv')

// config
dotenv.config()
const client = new Client()

client.start(process.env.TOKEN)
