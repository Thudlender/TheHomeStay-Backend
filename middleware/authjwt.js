//TODO
 const jwt = require("jsonwebtoken");
 const config = require("../config/auth.config");
 const db = require("../models");
 const User = db.User;

 //verify token
verifytoken = (req, res, next) =>{
    let token = req.headers["x-access-token"];
    //1st verify
    if(!token){
                   //|important!|
                   //   \/
      return res.status(403).send({message: "No token provided!" });
    }
    jwt.verify(token, config.secrets, (err, decoded)=>{
        if (err) {
            return res.status(401).send({ message: "Unautherized!"});
        }
        req.userId = decoded.id;
        next();
    });
};
//isAdmin?
isAdmin = (req, res, next) => {
    //SELECT "roles","name" FROM "users", "roles", "uesr_roles", WHERE "users","id" = 5 and "users","id" = "user_roles","userId" and "roles","id" = "user_roles","roleId"
    User.findByPk(req.userId).then((user)=>{
        user.getRoles().then((roles)=>{
            for (let i = 0; i< roles.lenght; i++){
                if(roles[i].name === "admin" ){
                    next();
                    return;
                }
            }
            return res.status(401).send({message:"Unauthorized access, require Admin Role!"})
        })
    }) 
}
//isMod?
isMod = (req, res, next) => {
  
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.lenght; i++) {
        if (roles[i].name === "moderator" || roles [i].name === "admin") {
          next();
          return;
        }
      }
      return res
        .status(401)
        .send({ message: "Unauthorized access, require Moderator Role!" });
    });
  });
};

//IsAdminOrMod?
isModOrAdmin = (req, res, next) => {
  
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.lenght; i++) {
        if (roles[i].name === "adminormod") {
          next();
          return;
        }
      }
      return res
        .status(401)
        .send({ message: "Unauthorized access, require AdminOrMod Role!" });
    });
  });
};


const authJwt = {
    verifytoken,
    isModOrAdmin, isAdmin, isMod
};
module.exports = authJwt;