const route = require("express").Router();
const { login, updateStudentPass, logout } = require("./controller")
const auth = require("../../Auth/authStudent");


route.post("/login", login)
route.patch("/updatePass", auth.checkToken, updateStudentPass)
route.post("/logout", auth.checkToken, logout)
route.get("/", auth.checkToken, (req, res) => {
    res.send("you are authanticated student")
})

module.exports = route