const sqlite3 = require("sqlite3");
const path = require("path")
const dbPath = path.join(__dirname,"database.db");

let db = new sqlite3.Database(dbPath,(err) => {
    if(err){
        console.log(`DB Connection Error:${err.message}`)
    }else{
        console.log(`DB Connected Successfully!`)
    }
})

const createUserTable = `
CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        mobile INTEGER NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
    )`;
const createJobTable = `
CREATE TABLE IF NOT EXISTS job (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        aboutCompany TEXT NOT NULL,
        addLogoUrl TEXT NOT NULL,
        companyName TEXT NOT NULL,
        information TEXT NOT NULL,
        jobDescription TEXT NOT NULL,
        jobPosition TEXT NOT NULL,
        jobType TEXT NOT NULL,
        location TEXT NOT NULL,
        monthlySalary TEXT NOT NULL,
        remoteOrOffice TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        selectedSkills TEXT
    )`;
    
db.run(createUserTable, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('User Table created successfully');
});
db.run(createJobTable, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Job Table created successfully');
});

module.exports =  db;