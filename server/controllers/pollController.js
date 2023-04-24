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
const poll = (req, res, next) => {
  const { email, JobTitle, CreatorEmail } = req.body;

  bcrypt
    .hash(email.split("@")[0], process.env.SALT)
    .then((hashedUser) => {
      return new Promise((resolve, reject) => {
        dbUserConn.query(
          `
                        Replace Student_Job_Interest 
                        (User, School, JobTitle, CreatorEmail)
                        values
                        (?,?,?,?);
                `,
          [hashedUser, email.split("@")[1], JobTitle, CreatorEmail],
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

/**************
 * The results function returns the poll results to the browser
 **************/
const results = (req, res, next) => {
  return new Promise((resolve, reject) => {
    dbUserConn.query(
      `
      select JobTitle, count(*) as studentCount from Student_Job_Interest
      where School = 'bronxsoftware.org'
      group by JobTitle
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
};

// make the above code accessible for other code modules
module.exports = { jobList, poll, results };
