const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ 
    settings: {
        server: {
            name: "Untitled Monito Server"
        },
        installed: false
    },
    logs: [],
    triggers: []
 })
  .write()

module.exports = db