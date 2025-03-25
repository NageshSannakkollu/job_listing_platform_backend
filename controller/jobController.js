// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken");
const Jobs = require("../models/jobModels");

const jobRegistration = async(req,res) => {
    const jobDetails = req.body;
    const {aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,selectedSkills} = jobDetails
    const skillsJson = JSON.stringify(selectedSkills)
    console.log("selectedSkills:",jobDetails)
    Jobs.create(aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,skillsJson,(err,newJob) => {
        if(err){
            console.log("Error:",err.message)
            return res.status(200).json({message:err.message,success:false})
        }
        return res.status(201).json({message:"New Job Created Successfully!",Job:newJob,success:true})
    })
};

const getAllJobsList = (req,res) => {
    // console.log("All users Request")    
    Jobs.getAllJobs((err,jobs) => {
        if(err){
            return res.status(200).json({error:err.message,success:false})
        }
        res.status(200).json(jobs)
    })
}

const getJobBySpecificId = (req,res) => {
    const {id} = req.params;
    // console.log(id)
    Jobs.getById(id,(err,job)=> {
        try {
            return res.status(200).json(job)
        } catch (error) {
            if(err){
            return res.status(200).json({error:err.message,success:false})
        }
        if(job === undefined){
            return res.status(200).json({message:`Invalid Job Id:${id}`,success:false})
        }
        }
        
    })
}

const updateJobQuery = async(req,res) => {
    const {id} = req.params;
    // const updateDetails = req.body;
    // console.log("updateDetails:",updateDetails)
    const {aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,selectedSkills}= req.body
    Jobs.updateJobById(id,aboutCompany,addLogoUrl,companyName,companySize,information,jobDescription,jobPosition,jobType,location,monthlySalary,remoteOrOffice,created_at,selectedSkills,(err,newJob) => {
        if(err){
            // console.log("Error:",err.message)
            return res.status(200).json({message:err.message,success:false})
        }
        return res.status(200).json({message:"Job Updated Successfully!",Job:newJob,success:true})
    })
}

const deleteJobBySpecificId = (req,res) => {
    const {id} = req.params;
    console.log(id)
    Jobs.deleteById(id,(err,job)=> {
        try {
            return res.status(200).json({success:true})
        } catch (error) {
            if(err){
            return res.status(200).json({error:err.message,success:false})
        }
        if(job === undefined){
            return res.status(200).json({message:`Invalid Job Id:${id}`,success:false})
        }
        }
        
    })
}


module.exports = {jobRegistration,getAllJobsList,getJobBySpecificId,deleteJobBySpecificId,updateJobQuery}