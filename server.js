let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const { database } = require('./config.js');

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

// API to search for movies by title, actor, and director
app.post('/api/searchMovie', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql =
		`SELECT DISTINCT m.name, GROUP_CONCAT(DISTINCT CONCAT(d.first_name, " " , d.last_name)) AS directorFullName, GROUP_CONCAT(DISTINCT CONCAT(r.reviewTitle,  " : " , r.reviewContent)) AS review, AVG(r.reviewScore) as avgRating 
	FROM movies m INNER JOIN movies_directors md ON md.movie_id = m.id 
	INNER JOIN directors d ON d.id = md.director_id 
	INNER JOIN roles ro ON ro.movie_id = m.id 
	INNER JOIN actors a ON a.id = ro.actor_id 
	LEFT JOIN Review r ON r.movieID = m.id 
	WHERE`;

	let data = [];

	let title = req.body.title;
	let actor = req.body.actor;
	let director = req.body.director;

	let titleWHERE = "";
	let actorWHERE = "";
	let directorWHERE = "";
	let totalWHERE = [];
	let finalWHERE = "";

	if (title !== "") {
		let titleWHERE = " m.name = ?";
		data.push(title);
		totalWHERE.push(titleWHERE);
	}

	if (actor !== "") {
		let actorWHERE = ` CONCAT(a.first_name, " ", a.last_name) = ? `;
		data.push(actor);
		totalWHERE.push(actorWHERE);
	}

	if (director !== "") {
		let directorWHERE = ` CONCAT(d.first_name, " ", d.last_name) = ? `;
		data.push(director);
		totalWHERE.push(directorWHERE);
	}

	totalWHERE.map(function (field) {
		if (field !== "") {
			if (finalWHERE !== "") {
				finalWHERE += ' AND ';
			};

			finalWHERE += field;
		};
	});

	sql += finalWHERE + ` GROUP BY m.name ORDER BY m.name;`;
	console.log(sql);
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

// API to get movie trailers
app.post('/api/getMovieTrailers', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql =
		`SELECT DISTINCT m.name, t.YoutubeID
	FROM e7shah.movies m
	LEFT JOIN Trailers t ON t.movieID = m.id
	WHERE m.name LIKE ?`;
	
	console.log(sql);

	let data = [req.body.name + "%"];
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



// app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
