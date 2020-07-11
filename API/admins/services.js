const db = require("../../DB/database")

//students tasks
const getAllStudents = (callback) => {
    db.query("select * from students", (err, results, fields) => {
        if (err) {
            return callback(err)
        }
        return callback(null, results)
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
const getStudentByLevel = (level, callback) => {
    db.query("select * from students where level=?", level, (err, results, fields) => {
        if (err) {
            return callback(err)
        }
        return callback(null, results)
    })
}
const addOldStudent = (data, callback) => {
    db.query("insert into students (student_id,firstName,lastName,email,password,level,gpa,cgpa,hoursOfTerm,hoursCompleted)values (?,?,?,?,?,?,?,?,?,?)", [
        data.id, data.firstName, data.lastName, data.email, data.password, data.level, data.gpa, data.cgpa, data.hoursOfTerm, data.hoursCompleted
    ], (err, results, fields) => {
        if (err) {
            console.log(err)
            return callback(err)
        }
        return callback(null, results)
    })
}
const addNewStudent = (data, callback) => {
    db.query("insert into students (student_id,firstName,lastName,email,password,level,gpa,cgpa,hoursOfTerm,hoursCompleted)values (?,?,?,?,?,1,0,0,?,0)", [
        data.id, data.firstName, data.lastName, data.email, data.password, data.hoursOfTerm,
    ], (err, results, fields) => {
        if (err) {
            console.log(err)
            return callback(err)
        }
        return callback(null, results)
    })
}
const updateStudent = (user, callback) => {
    db.query("update students set firstName=?,lastName=?,email=?,password=?,gpa=?,cgpa=?,level=?,hoursOfTerm=?,hoursCompleted=? where student_id=?", [
        user.firstName, user.lastName, user.email, user.password, user.gpa, user.cgpa, user.level, user.hoursOfTerm, user.hoursCompleted, user.id
    ], (err, results) => {
        if (err) {
            return callback(err)
        }
        return callback(null, results)
    })
}
const deleteStudent = (ID, callBack) => {
    db.query("delete from students where student_id=?", [ID], (error, results) => {
        if (error) {
            callBack(error)
        }
        console.log(results)
        return callBack(null, results)
    })
}
const getStudentByEmail = (email, callback) => {
    db.query("select * from students where email=?", email, (err, results) => {
        if (err) {
            return callback(err)
        }
        return callback(null, results)
    })
}

//admin tasks
const addAdmin = (data, callBack) => {
    db.query("select * from admin where ID=?", data.ID, (err, results) => {
        if (err) return callBack(err)
        if (results.length > 0) return callBack(new Error("this id id already in use"))
        db.query("insert into admin (ID,name,email,password) values(?,?,?,?)", [data.ID, data.name, data.email, data.password], (err, results) => {
            if (err) return callBack(err)
            return callBack(null, results)
        })
    })

}
const getAdminByEmail = (email, callback) => {
    db.query("select * from admin where email=?", email, (err, results) => {
        if (err) {
            return callback(err)
        }
        return callback(null, results)
    })
}
const addToken = (id, token, callback) => {
    db.query("insert into admin_tokens values (?,?)", [id, token], (err, results) => {
        if (err) return err
        return callback(null, results)
    })
}
const getAdminToken = (id, token, callback) => {
    try {
        db.query("select * from admin_tokens where ID=? and token=?", [id, token],
            (err, Results) => {
                if (err) return callback(new Error("Invalid Token"));
                if (Results.length === 0) return callback(new Error("Invalid Token"));
                else return callback(null, Results)
            })
    } catch (e) {
        console.log(e)
    }
}
const deleteAdminToken = (token, callback) => {
    db.query("delete from admin_tokens where token=?", token, (err, results) => {
        if (err) callback(new Error("could not login"));
        return callback(null, results)
    })
}

//porf tasks
const getAllProfs = (callback) => {
    db.query("select * from profs", (err, results) => {
        if (err) return callback(err)
        return callback(null, results)
    })
}
const getProfByID = (id, callback) => {
    db.query("select * from profs where ID=?", id, (err, results) => {
        if (err) return callback(err)
        return callback(null, results)
    })
}
const addProf = (data, callback) => {
    db.query("select * from profs where ID=?", data.ID, (err1, results) => {
        if (err1) return callback(err1)
        if (results.length > 0) return callback("ID in Use")
        db.query("insert into profs values (?,?,?,?,?,?)", [
            data.ID, data.firstName, data.lastName, data.rank, data.email, data.password,
        ], (err, results, fields) => {
            if (err) return callback(err)
            return callback(null, results)
        })
    })
}
const updateProf = (data, callback) => {
    db.query("update profs set firstName=?,lastName=?,ranck=?,email=?,password=? where ID=?", [
        data.firstName, data.lastName, data.ranck, data.email, data.password, data.id
    ], (err, results) => {
        if (err) return callback(err)
        return callback(null, results)
    })
}
const deleteProf = (ID, callBack) => {
    db.query("delete from profs where ID=?", [ID], (error, results) => {
        if (error) callBack(error)
        return callBack(null, results)
    })
}
const getProfByEmail = (email, callback) => {
    db.query("select * from profs where email=?", email, (err, results) => {
        if (err) return callback(err)
        return callback(null, results)
    })
}
module.exports = {
    getAllStudents,
    getStudentByID,
    getStudentByLevel,
    addOldStudent,
    addNewStudent,
    updateStudent,
    deleteStudent,
    getStudentByEmail,
    getAdminByEmail,
    addAdmin,
    addToken,
    getAdminToken,
    deleteAdminToken,
    getAllProfs,
    getProfByID,
    addProf,
    updateProf,
    deleteProf,
    getProfByEmail
}