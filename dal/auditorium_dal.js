var mysql = require('mysql');
var db = require('./db_connection.js')
/* DATA BASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM auditorium;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

exports.update = function(params, callback) {
    var query = 'UPDATE auditorium SET CAPACITY = ?, CINEMA_ID = ?, MOVIE_ID = ?';
    var queryData = [params.CAPACITY, params.CINEMA_ID, params.MOVIE_ID];
    connection.query(query, queryData, function(err, result) {

        callback(err,result);
    });
};


exports.getinfo = function(AUDITORIUM_ID, callback) {
    var query = 'CALL auditorium_getinfo(?)';
    var queryData = [AUDITORIUM_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO auditorium(CAPACITY, CINEMA_ID, MOVIE_ID) VALUES (?, ?, ?)';

    var queryData = [params.CAPACITY, params.CINEMA_ID, params.MOVIE_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err,result);
    });
};


