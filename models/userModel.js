const bcrypt = require("bcryptjs")
const db = require("../config/db")

const User = {
    create:async (username,email,password,mobile,callback) => {
        const hashedPassword = await bcrypt.hash(password,10)
        const number = parseInt(mobile)
        // console.log(number)
        db.run(
            `INSERT INTO user (username,email,password,mobile) VALUES ('${username}','${email}','${hashedPassword}',${number})`,
            function(err){
                callback(err,{id:this.lastID})
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
    },
    deleteUser:(username,callback) => {
        db.run(`DELETE FROM user WHERE username='${username}'`,
            function(err,user){
                callback(err,user)
            }
        )
    },
    getAllUsers:(callback) => {
        // console.log('All Users')
        db.all(`SELECT * FROM user`,
            function(err,user){
                callback(err,user)
            }
        )
    }
}
    
module.exports = User;