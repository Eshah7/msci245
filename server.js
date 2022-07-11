let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');

// App is the object, once you use post, its a POST API!
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// The post API
app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

// API to get movies list!
app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM e7shah.movies;`;
	console.log(sql);

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		
		res.send({ express: string });
	});
	connection.end();
});

// API to post the review!
app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config); 

	let insertReviewSQL = 'INSERT INTO e7shah.Review (reviewTitle, reviewContent, reviewScore, userID, movieID) VALUES (?, ?, ?, ?, ?)'; 
	let insertReviewData = [req.body.reviewTitle, req.body.reviewContent, req.body.reviewScore, req.body.userID, req.body.movieID];

	connection.query(insertReviewSQL, insertReviewData, (error, results, fields) => {
		if (error) {
			console.log(error.message); 
		}

		let obj = JSON.parse(results);

		res.send({ express: obj });
	});

	connection.end();

});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
// app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
