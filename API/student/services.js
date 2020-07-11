const db = require("../../DB/database")

const getStudentByEmail = (email, callback) => {
    db.query("select * from students where email=?", email, (err, results) => {
        if (err) {
            return callback(err)
        }
        return callback(null, results[0])
    })
}

const getStudentByID = (id, callback) => {
    db.query("select * from students where student_id=?", id, (err, results, fields) => {
        if (err) {
            return callback(err)
        }
        return callback(null, results)
    })
}

const updateStudentPass = (user, callback) => {
    db.query("update students set password=? where student_id=?", [
        user.password, user.id,
    ], (err, results) => {
        if (err) {
            return callback(err)
        }
        return callback(null, results)
    })
}

const addToken = (id, token, callback) => {
    db.query("insert into student_tokens values (?,?)", [id, token], (err, results) => {
        if (err) callback(err)
        callback(null, results)
    })
}

const getStudentToken = (id, token, callback) => {
    try {
        db.query("select * from student_tokens where studentID=? and token=?", [id, token],
            (err, Results) => {
                if (err) return callback(new Error("Invalid Token"));
                if (Results.length === 0) return callback(new Error("Invalid Token"));
                else return callback(null, Results)
            })
    } catch (e) {
        console.log(e)
    }
}

const deleteStudentToken = (token, callback) => {
    db.query("delete from student_tokens where token=?", token, (err, results) => {
        if (err) callback(new Error("could not login")); //res.status(500).json({ success: 0, message: "coudnt logout", err })
        return callback(null, results) //res.json({ success: 1, message: "logout successfully" })
    })
}
module.exports = { getStudentByEmail, getStudentByID, updateStudentPass, addToken, getStudentToken, deleteStudentToken }