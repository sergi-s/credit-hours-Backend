const {
    addAdmin,
    getAllStudents,
    getStudentByID,
    getStudentByLevel,
    addNewStudent,
    addOldStudent,
    updateStudent,
    deleteStudent,
    login,
    logout,
    getAllProfs,
    addProf,
    updateProf,
    deleteProf,
    getProfByID
} = require("./contoller");
const route = require("express").Router();
const authAmin = require("../../Auth/authAdmin");

//students routes 
route.get("/student/", authAmin.checkToken, getAllStudents)
route.post("/student/New", authAmin.checkToken, addNewStudent)
route.post("/student/Old", authAmin.checkToken, addOldStudent)
route.patch("/student/", authAmin.checkToken, updateStudent)
route.delete("/student/:id", authAmin.checkToken, deleteStudent)
route.get("/student/id/:id", authAmin.checkToken, getStudentByID)
route.get("/student/level/:level", authAmin.checkToken, getStudentByLevel)


//profs routes
route.get("/prof/", authAmin.checkToken, getAllProfs)
route.post("/prof/", authAmin.checkToken, addProf)
route.patch("/prof/", authAmin.checkToken, updateProf)
route.delete("/prof/:id", authAmin.checkToken, deleteProf)
route.get("/prof/id/:id", authAmin.checkToken, getProfByID)


//admin routes
route.post("/login", login)
route.post("/logout", authAmin.checkToken, logout)
route.post("/", addAdmin)
route.get("/", authAmin.checkToken, (req, res) => {
    res.send("you are authanticated admin ")
})

//courses routes
route.post("/course/", authAmin.checkToken)
route.delete("/course/", authAmin.checkToken)
route.patch("/course/", authAmin.checkToken)



module.exports = route