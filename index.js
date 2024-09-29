const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const homestayRouter = require("./routers/homestay.router");

const db = require("./models/");
const role = db.Role;
const authRouter = require("./routers/auth.router")

//Dev mode
// db.sequelize.sync({force:true}).then(()=>{
//     initRole();
//     console.log("Drop and Sync DB")
// })


const initRole = () => {
    role.create({ id: 1, roleName: "user"});
    role.create({ id: 2, roleName: "moderator" });
    role.create({ id: 3, roleName: "admin" });
};

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use router
app.use("/api/v1/restaurants",homestayRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req,res) => {
    res.send("<h1>Hello HomeStay API</h1>");
});

app.listen(PORT, ()=>{
    console.log("Listening to http://localhost:"+PORT)
});