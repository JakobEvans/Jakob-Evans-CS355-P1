var mysql = require('mysql');
var db = require('./db_connection.js');
/* DATA BASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.query1 = function(callback) {
    var query = '.....my subqueries';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

exports.query2 = function(callback) {
    var query = '.....my subqueries';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

exports.query3 = function(callback) {
    var query = 'select movie.MOVIE_NAME\n' +
        'from movie\n' +
        'WHERE MOVIE_ID IN\n' +
        '(SELECT MOVIE_ID from movie_auditorium);';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

exports.query4 = function(callback) {
    var query = 'select movie.MOVIE_NAME\n' +
        'from movie\n' +
        'WHERE NOT EXISTS\n' +
        '(SELECT MOVIE_ID from movie_auditorium\n' +
        'WHERE movie.MOVIE_ID = movie_auditorium.MOVIE_ID);';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};


exports.query5 = function(callback) {
    var query = '.....my subqueries';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};


exports.query6 = function(callback) {
    var query = '.....my subqueries';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

/* Q# 7 make  so it can get average*/
exports.query7 = function(callback) {
    var query = 'select avg(screenings) as Average_screenings\n' +
        'FROM\n' +
        '  (\n' +
        'Select movie.MOVIE_NAME, count(movie.MOVIE_ID) as screenings\n' +
        'from movie\n' +
        'LEFT JOIN movie_auditorium on movie.MOVIE_ID = movie_auditorium.MOVIE_ID\n' +
        'GROUP BY movie.MOVIE_ID\n' +
        'having count(movie.MOVIE_ID)) as done;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

/* # 8Query Using Order By*/
exports.query8 = function(callback) {
    var query = 'Select * from movie order by movie.MOVIE_NAME;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};


exports.query9 = function(callback) {
    var query = '.....my subqueries';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};


exports.query10 = function(callback) {
    var query = '.....my subqueries';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};