const bcrypt = require("bcryptjs")
const db = require("../config/db")


const Jobs = {
    
    create:async (aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,skillsJson,callback) => {
        const jobsQuery = `INSERT INTO job (aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,selectedSkills) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.run(jobsQuery,[aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,skillsJson],function(err){
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
    updateJobById:async (id,aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,skillsJson,callback) => {
        const jobsQuery = `UPDATE job SET aboutCompany='${aboutCompany}',addLogoUrl='${addLogoUrl}',companyName='${companyName}',companySize='${companySize}',information='${information}',jobDescription='${jobDescription}',jobPosition='${jobPosition}',jobType='${jobType}',location='${location}',monthlySalary='${monthlySalary}',remoteOrOffice='${remoteOrOffice}',created_at='${created_at}',selectedSkills='${skillsJson}' WHERE id=${id}`;
        db.run(jobsQuery,function(err,newJob){
            callback(err,newJob)
        })
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