const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

module.exports = (schema) => {
    
    const adapter = new FileSync('db.json')
    const db = low(adapter)

    db.defaults(schema)
        .write(); 
    
    return db
}