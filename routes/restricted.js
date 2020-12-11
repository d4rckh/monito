const router = require("express").Router()
const db = require("../database.js")

router.use((req, res, next) => {
    const code = db.get("settings.code").value()
    if (
        (req.query.code == code && req.method == "GET") ||
        (req.body.code == code && req.method == "POST")
    ) {
        next()
    } else {
        return res.json({
            error: "invalid code"
        })
    }
})

router.get("/api/triggers/", (req, res) => {
    res.json({
        error: null,
        data: db.get("triggers").value()
    })
})

router.post("/api/triggers/", (req, res) => {
    db.set("triggers", req.body.triggers).write()
    res.json({error: null, data: db.get("triggers").value()})
})

router.get("/api/info", (req, res) => {
    res.json({
        server: {
            name: db.get("settings.server.name").value(),
            ip: "127.0.0.1"
        },
        error: null
    })
})

module.exports = router