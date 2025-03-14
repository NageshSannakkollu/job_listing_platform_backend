const bcrypt = require("bcrypt")
const db = require("../config/db")


const User = {
    create:async (username,email,password,mobile,role,callback) => {
        const hashedPassword = await bcrypt.hash(password,10)
        const number = parseInt(mobile)
        // console.log(number)
        db.run(
            `INSERT INTO user (username,email,password,mobile,role) VALUES ('${username}','${email}','${hashedPassword}',${number},'${role}')`,
            function(err){
                callback(err,{id:this.lastID,username,email,password,mobile,role})
            }
        )
    },
    getByEmail:(email,callback) => {
        // console.log("Email:",email)
        db.get(`SELECT * FROM user WHERE email='${email}'`,
        function (err,user){
            callback(err,user)  
        })
    },
    getProfileEmail:(email,callback) => {
        db.get(`SELECT * FROM user WHERE email='${email}'`,
        function (err,user){
            callback(err,user)  
        })
    } 
}
    
module.exports = User;