var mysql = require('mysql');
var db = require('./db_connection.js')
/* DATA BASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM cinema;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

exports.update = function(params, callback) {
    var query = 'CALL cinema_update(?)';
    var queryData = [params.CINEMA_STREET, params.CINEMA_CITY,
        params.CINEMA_STATE, params.CINEMA_ZIP, params.CINEMA_NAME, params.CINEMA_ID];
    connection.query(query, [queryData], function(err, result) {

            callback(err,result);
        });
    };


exports.getinfo = function(cinema_id, callback) {
    var query = 'CALL cinema_getinfo(?)';
    var queryData = [cinema_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO cinema(CINEMA_STREET, CINEMA_CITY, CINEMA_STATE, CINEMA_ZIP, CINEMA_NAME) VALUES (?, ?, ?, ?, ?)';

    var queryData = [params.CINEMA_STREET, params.CINEMA_CITY, params.CINEMA_STATE, params.CINEMA_ZIP, params.CINEMA_NAME];

    connection.query(query, queryData, function(err, result) {
        callback(err,result);
                });
        };


