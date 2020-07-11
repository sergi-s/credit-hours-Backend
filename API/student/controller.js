const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../../DB/database")
const { getStudentByEmail, getStudentByID, updateStudentPass, addToken, deleteStudentToken } = require("./services")

module.exports = {
    login: (req, res) => {
        const body = req.body
        getStudentByEmail(body.email, (err, results) => {
            if (err) res.status(500).json({ success: 0, err })
            if (!results) res.status(404).json({ success: 0, message: "Not found", results })
            if (bcrypt.compareSync(body.password, results.password)) {
                const token = jwt.sign({ results }, "secret", { expiresIn: "1h" })
                body.token = token
                addToken(results.student_id, token.toString(), (err, results) => {
                    if (err) res.status(500).json({ success: 0, err })
                })
                res.json({ success: 1, message: "loged in seccessfully", token: req.body.token })
            } else {
                res.json({ success: 0, message: "invalid email or password" })
            }
        })
    },
    updateStudentPass: (req, res) => {
        const data = req.body
        const salt = bcrypt.genSaltSync(8)
        data.password = bcrypt.hashSync(data.password, salt)
        updateStudentPass(data, (err, results) => {
            if (err) {
                res.status(500).json({ success: 0, message: err })
            }
            res.json({ success: 1, message: results })
        })
    },
    logout: (req, res) => {
        deleteStudentToken(req.token.toString(), (err, results) => {
            if (err) res.status(500).json({ success: 0, message: "coudnt logout", err })
            res.json({ success: 1, message: "logout successfully" })
        })
    },

}