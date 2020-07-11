const jwt = require("jsonwebtoken");

const { getStudentToken } = require("../actors/student/services")
module.exports = {
    checkToken: async(req, res, next) => {
        try {
            let token = req.header('Authorization').replace('Bearer ', '')
            const decoded = await jwt.verify(token, "secret")
            getStudentToken(decoded.results.student_id, token.toString(), (err, results) => {
                if (err) return res.json({ err, message: "Not authorized" })
                req.token = token
                req.data = decoded
                next()
            })
        } catch (e) {
            res.json({ err: "Not authorized" })
        }
    }

}