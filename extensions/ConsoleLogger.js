module.exports = class hi {
    constructor(c) {

        this.info = {
            
        }

        this.info.name = "ConsoleLogger"
        this.info.description = "This plugin will console log when there are new triggers triggered."
        this.info.author = "d4rckh"

        this.triggers = c.db.get("triggers").value()

        c.on("newTrigger", (data) => {
            console.log(`[${this.triggers[data.trigger].type}] ${data.trigger}: ${data.data}`)
        })
    }
}