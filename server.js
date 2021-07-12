const express = require('express')
const fileWalk = require('./utils/fileWalk')
const bodyParser = require('body-parser');
const EventEmitter = require('events');
const path = require('path');

class Monito extends EventEmitter {
    constructor() {
        super()

        this.dbschema = { 
            settings: {
                server: {
                    name: "Untitled Monito Server"
                },
                installed: false,
                code: ""
            },
            logs: [],
            triggers: []
         }
    }

    init() {
        this.db = require("./database.js")(this.dbschema)
        
        this.extensions = []

        this.loggedInClients = []

        this.app = express()
        this.http = require('http').createServer(this.app);

        this.io = require('socket.io')(this.http);
        
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());


        this.on("newTrigger", ({
            trigger, id, data, at
        }) => {
            this.loggedInClients.forEach(a => {
                a.emit("trigger", [{
                    trigger, id, data, isRestoreTrigger: false, at
                }])
            })
        })

        return this

    }

    loadRoutes() {

        this.app.get("/", (req, res) => {
            console.log("hi")
            if (this.db.get("settings.installed").value()) {
                res.redirect("/index.html")
            } else {
                res.redirect("/setup.html")
            }
        })

        
        this.app.post("/api/install", (req, res) => {
            if (!this.db.get("settings.installed").value()) {
                this.db.set("settings.installed", true)
                .set("settings.server.name", req.body.servername)
                .set("settings.code", req.body.code)
                .write()
            }

            res.redirect("/index.html")

        })

        this.app.get("/api/isinstalled", (req, res) => {
            res.json({
                data: this.db.get("settings.installed").value(),
                error: null
            })
        })

        this.app.use(express.static("public"))


                
        this.io.on('connection', (socket) => {
            socket.on("login", (data) => {
            if (data == this.db.get("settings.code").value()) {
                socket.on("sendAllLogs", () => {
                        socket.emit("trigger",
                        
                        
                        this.db.get("logs").value().map(c => {
                            c.isRestoreTrigger = true
                            return c
                        })
                        
                        )
                })
                this.loggedInClients.push(socket)
            }
            })
        });

        this.app.get("/api/trigger/", (req, res) => {
            const trigger = req.query.trigger || "default"
            const data = req.query.data || "No data sent by trigger."
            res.json({error: null})
            const id = require("nanoid").nanoid(10)
            this.db.get("logs").push({
                trigger, id, data, at: new Date().getTime()
            }).write()
            this.emit("newTrigger", {
                trigger, id, data, at: new Date().getTime()
            })
        })

        this.app.use("/", require("./routes/restricted.js")(this))

        return this
    }

    loadExtensions() {
        fileWalk('./extensions').then((files) => {
            files = files.map(pathstring => pathstring.split(path.sep).join(path.posix.sep)).filter(file => file.endsWith('.js') && file !== "extensions/ExtensionBase.js")
            for (const file of files) {
                try {
                    const extension = new (require(`./${file}`))(this);    
                    this.extensions.push(extension)
                } catch (e) {
                    console.error(e)
                }
            }
        })
        return this
    }

    listenHttp() {
        this.http.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }

}




(new Monito()).loadExtensions().init().loadRoutes().listenHttp()