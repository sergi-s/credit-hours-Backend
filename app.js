const express = require("express")
const adminRoute = require("./actors/admins/routes")
const studentRoute = require("./actors/student/routes")
const app = express();

app.use(express.json())
app.use("/admin", adminRoute)
app.use("/student", studentRoute)

app.listen(3000, () => {
    console.log("app is running on port 3000")
})