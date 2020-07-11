const {
    getAllStudents,
    getStudentByID,
    getStudentByLevel,
    addOldStudent,
    addNewStudent,
    updateStudent,
    deleteStudent,
    getAdminByEmail,
    addAdmin,
    addToken,
    deleteAdminToken,
    getAllProfs,
    getProfByID,
    addProf,
    updateProf,
    deleteProf,
} = require("./services")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
module.exports = {

    //students functions
    getAllStudents: (req, res) => {
        getAllStudents((err, results) => {
            if (err) res.json({ success: 0, message: "error in the database" })
            res.json({ success: 1, message: "found", results })
        })
    },
    getStudentByID: (req, res) => {
        const id = req.params.id
        getStudentByID(id, (err, results) => {
            if (err)
                res.json({ success: 0, message: "error in the database" })
            if (!results) res.json({ success: 0, message: "not found" })
            res.json({ success: 1, message: "found", results })
        })
    },
    getStudentByLevel: (req, res) => {
        const level = req.params.level
        getStudentByLevel(level, (err, results) => {
            if (err)
                res.json({ success: 0, message: "error in the database" })
            if (!results)
                res.json({ success: 0, message: "not found" })
            res.json({ success: 1, message: "found", results })
        })
    },
    addOldStudent: (req, res) => {
        const data = req.body
        if (!data.id || !data.firstName || !data.lastName || !data.email || !data.password || !data.hoursOfTerm ||
            !data.level || !data.gpa || !data.cgpa || !data.hoursCompleted)
            res.status(500).json({ message: "INsert all requierd data" })
        const salt = bcrypt.genSaltSync(8)
        data.password = bcrypt.hashSync(data.password, salt)
        addOldStudent(data, (err, results) => {
            if (err) res.status(500).json({ success: 0, message: "error in database", err })
            res.json({ success: 1, message: "added successfully", results })
        })
    },
    addNewStudent: (req, res) => {
        const data = req.body
        if (!data.id || !data.firstName || !data.lastName || !data.email || !data.password || !data.hoursOfTerm)
            res.status(500).json({ message: "Insert all requierd data" })
        const salt = bcrypt.genSaltSync(8)
        data.password = bcrypt.hashSync(data.password, salt)
        addNewStudent(data, (err, results) => {
            if (err) res.status(500).json({ success: 0, message: "error in database", err })
            res.json({ success: 1, message: "added successfully", results })
        })
    },
    updateStudent: (req, res) => {
        const data = req.body
        if (!data.firstName || !data.lastName || !data.email || !data.password || !data.gpa || !data.cgpa || !data.level || !data.hoursOfTerm) {
            res.status(500).json({ message: "inset all required data" })
        }
        const salt = bcrypt.genSaltSync(8)
        data.password = bcrypt.hashSync(data.password, salt)
        updateStudent(data, (err, results) => {
            if (err) {
                res.status(500).json({ success: 0, message: err })
            }
            res.json({ success: 1, message: results })
        })
    },
    deleteStudent: (req, res) => {
        const ID = req.params.ID
        deleteStudent(ID, (err, results) => {
            if (err) res.status(500).json({ success: 0, message: err })
            res.json({ success: 1, message: results })
        })
    },

    //Prof function
    getAllProfs: (req, res) => {
        getAllProfs((err, results) => {
            if (err) return res.json({ success: 0, message: "error in the database" })
            return res.json({ success: 1, message: "found", results })
        })
    },
    getProfByID: (req, res) => {
        const id = req.params.id
        getProfByID(id, (err, results) => {
            if (err) return res.json({ success: 0, message: "error in the database" })
            if (!results) return res.json({ success: 0, message: "not found" })
            return res.json({ success: 1, message: "found", results })
        })
    },
    addProf: (req, res) => {
        const data = req.body
        if (!data.ID || !data.firstName || !data.lastName || !data.rank || !data.email || !data.password)
            return res.status(500).json({ success: 0, message: "insert all required data" })
        const salt = bcrypt.genSaltSync(8)
        data.password = bcrypt.hashSync(data.password, salt)
        addProf(data, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "error in database", error: err })
            return res.json({ success: 1, message: "added successfully", results })
        })
    },
    updateProf: (req, res) => {
        const data = req.body
        if (!data.firstName || !data.lastName || !data.email || !data.password || !data.ranck)
            res.status(500).json({ message: "inset all required data" })
        const salt = bcrypt.genSaltSync(8)
        data.password = bcrypt.hashSync(data.password, salt)
        updateProf(data, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err })
            return res.json({ success: 1, message: results })
        })
    },
    deleteProf: (req, res) => {
        const ID = req.prams.ID
        deleteProf(ID, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err })
            return res.json({ success: 1, message: results })
        })
    },
    //Course functions


    //Admin functions
    addAdmin: (req, res) => {
        const data = req.body
        if (!data.ID || !data.name || !data.email || !data.password)
            return res.status(500).json({ message: "Insert all requierd data" })
        const salt = bcrypt.genSaltSync(8)
        data.password = bcrypt.hashSync(data.password, salt)
        addAdmin(data, (err, results) => {
            if (err) return res.status(500).json({ success: "error in database", err })
            return res.json({ success: 1, message: "added successfully", results })
        })
    },
    login: (req, res) => {
        const body = req.body
        if (!body.email || !body.password) return res.status(500).json({ success: 0, message: "missing data" })
        getAdminByEmail(body.email, (err, results) => {
            if (err) res.status(500).json({ success: 0, err })
            if (!results) res.status(404).json({ success: 0, message: "Not found", results })
            if (bcrypt.compareSync(body.password, results[0].password)) {
                const token = jwt.sign({ results }, "secret", { expiresIn: "1h" })
                body.token = token
                addToken(results[0].ID, token.toString(), (err, results) => {
                    if (err) return res.status(500).json({ success: 0, err })
                })
                return res.json({ success: 1, message: "loged in seccessfully", token: req.body.token })
            } else {
                return res.json({ success: 0, message: "invalid email or password" })
            }
        })
    },
    logout: (req, res) => {
        deleteAdminToken(req.token.toString(), (err, results) => {
            if (err) res.status(500).json({ success: 0, message: "coudnt logout", err })
            res.json({ success: 1, message: "logout successfully" })
        })
    },
}