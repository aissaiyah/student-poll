const express = require('express'); // load the node.js webserver
const router = express.Router(); // extract the Router from the webserver for us to use.
const pollController = require('../controllers/pollController.js'); // load our controller that processes our business logic and accesses the database.

router.get('/joblist', pollController.jobList); // route to load the job list
router.post('/poll', pollController.poll); // route to post the job selection of the user
router.get('/results', pollController.results); // route to load the poll result data for the chart

// make the above code accessible for other code modules
module.exports = router;
