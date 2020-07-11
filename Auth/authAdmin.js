const jwt = require("jsonwebtoken")

const { getAdminToken } = require("../API/admins/services")

module.exports = {
    checkToken: async(req, res, next) => {
        try {
            let token = req.header('Authorization').replace('Bearer ', '')
            const decoded = await jwt.verify(token, "secret")
            getAdminToken(decoded.results[0].ID, token.toString(), (err, results) => {
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