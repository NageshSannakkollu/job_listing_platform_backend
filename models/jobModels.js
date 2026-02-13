// const bcrypt = require("bcryptjs")
const db = require("../config/db")

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
}
const formatted_date = formatDate(new Date())

const Jobs = {
    create:async (aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,skillsJson,callback) => {
        const jobsQuery = `INSERT INTO job (aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,selectedSkills) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.run(jobsQuery,[aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,formatted_date,skillsJson],function(err){
            callback(err,{id:this.lastID})
        })
    },

    getAllJobs:(callback)=>{
        db.all(`SELECT * FROM job`,[],callback);
    },

    getById:(id,callback) => {
        db.get(`SELECT * FROM job WHERE id=${id}`,
            function(err,job){
                callback(err,job)
            }
        )
    },

    updateJobById:async (id,aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,skillsJson,callback) => {
        const params = [aboutCompany, addLogoUrl, companyName, companySize, information, jobDescription, jobPosition, jobType, formatted_date, location, monthlySalary, remoteOrOffice, skillsJson, id];
        const jobsQuery = `UPDATE job SET aboutCompany=?, addLogoUrl=?, companyName=?, companySize=?, information=?, jobDescription=?, jobPosition=?, jobType=?, created_at=?, location=?, monthlySalary=?, remoteOrOffice=?, selectedSkills=? WHERE id=?`;
        db.run(jobsQuery, params, function(err) {
            if (err) return callback(err);
                callback(null, { changes: this.changes });

        });
        
    },

    deleteById:(id,callback) => {
        db.get(`DELETE FROM job WHERE id=${id}`,
            function(err,job){
                callback(err,job)
            }
        )
    }
}
    
module.exports = Jobs;