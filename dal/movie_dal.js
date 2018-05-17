var mysql = require('mysql');
var db = require('./db_connection.js')
/* DATA BASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM movie;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

exports.update = function(params, callback) {
    var query = 'UPDATE movie SET MOVIE_NAME = ?, M_GENRE = ?, M_DIRECTOR = ?, RATING = ? WHERE MOVIE_ID = ?';
    var queryData = [params.MOVIE_NAME, params.M_GENRE, params.M_DIRECTOR, params.RATING, params.MOVIE_ID];
    connection.query(query, queryData, function(err, result) {

        callback(err,result);
    });
};


exports.getinfo = function(movie_id, callback) {
    var query = 'CALL movie_getinfo(?)';
    var queryData = [movie_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO movie(MOVIE_NAME, M_GENRE, M_DIRECTOR, RATING) VALUES (?, ?, ?, ?)';

    var queryData = [params.MOVIE_NAME, params.M_GENRE, params.M_DIRECTOR, params.RATING];

    connection.query(query, queryData, function(err, result) {
        callback(err,result);
    });
};


exports.delete = function(params, callback) {
    var query = 'Delete FROM movie WHERE MOVIE_ID = ?';

    var queryData = [params.MOVIE_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err,result);
    });
};
