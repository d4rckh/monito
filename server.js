const express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const bodyParser = require('body-parser');

const db = require("./database.js")
const loggedInClients = []


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    if (db.get("settings.installed").value()) {
        res.redirect("/index.html")
    } else {
        res.redirect("/setup.html")
    }
})

app.post("/api/install", (req, res) => {
    if (!db.get("settings.installed").value()) {
        console.log("hi")
        db  .set("settings.installed", true)
        .set("settings.server.name", req.body.servername)
        .set("settings.code", req.body.code)
        .write()
    }

    res.redirect("/index.html")

})

app.use(express.static("public"))


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("login", (data) => {
    if (data == db.get("settings.code").value()) {
        db.get("logs").value().forEach(log => {
            socket.emit("trigger", log)
        })
        loggedInClients.push(socket)
    }
  })
});

app.get("/api/trigger/", (req, res) => {
    const trigger = req.query.trigger || "default"
    res.json({error: null})
    const id = require("nanoid").nanoid(10)
    db.get("logs").push({
        trigger, id
    }).write()
    loggedInClients.forEach(a => {
        a.emit("trigger", {
            trigger, id
        })
    })
})

app.use("/", require("./routes/restricted.js"))

http.listen(3000, () => {
    console.log('listening on *:3000');
});
  