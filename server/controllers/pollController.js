const dbUserConn = require("../config/dbConnection"); // load the database connection
const mysql = require("mysql"); // load the MySQL module
const bcrypt = require("bcrypt"); // load the bcrypt cypher module

/***********
 * The joblist function returns the list of job titles with additional statistical information
 **********/
const jobList = (req, res) => {
  return new Promise((resolve, reject) => {
    dbUserConn.query(
      `
                Select * from Jobs_In_Demand;
        `,
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      }
    );
  })
  .then(results => {
    res.json(results)
  }) .catch(err => {
    console.log(err)
    res.sendStatus(500)
  });
};

/***************
 * The poll function receives the user input and stores it the database
 **************/
const poll = (req, res) => {
  const { email, SchoolID, JobTitle, CreatorEmail } = req.body;
 
  bcrypt
    .hash(email.split("@")[0], process.env.SALT)
    .then((hashedUser) => {
      return new Promise((resolve, reject) => {
        dbUserConn.query(
          `
                        Replace Student_Job_Interest
                        (User, School, SchoolID, JobTitle, CreatorEmail)
                        values
                        (?,?,?,?,?);
                `,
          [hashedUser, email.split("@")[1], SchoolID, JobTitle, CreatorEmail],
          (err, results) => {
            if (err) {
              reject(err);
            }
            resolve(results);
          }
        );
      });
    })
    .then(results => {
      res.json(results)
    }) .catch(err => {
      console.log(err)
      res.sendStatus(500)
    });
 };
 
 
 const results = (req, res) => {
  const { SchoolID } = req.body
 
  if(SchoolID === null) {
      return new Promise((resolve, reject) => {
          dbUserConn.query(
            `
            Select B.SchoolName, count(*) as studentCount from Student_Job_Interest A
            join NYC_High_Schools B on A.SchoolID = B.SchoolID
            where A.SchoolID is not null
            group by B.SchoolName
            order by studentCount desc;
              `,
            (err, results) => {
              if (err) {
                reject(err);
              }
              resolve(results);
            }
          );
        })   
        .then(results => {
          res.json(results)
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500)
        });
  }else{
      return new Promise((resolve, reject) => {
          dbUserConn.query(
            `
            Select JobTitle, count(*) as studentCount from Student_Job_Interest
            where SchoolID = ?
            group by JobTitle
            order by studentCount desc;
              `,[SchoolID],
            (err, results) => {
              if (err) {
                reject(err);
              }
              resolve(results);
            }
          );
        })   
        .then(results => {
          res.json(results)
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500)
        });
  }
 
 };
 
  
 




// make the above code accessible for other code modules
module.exports = { jobList, poll, results };
