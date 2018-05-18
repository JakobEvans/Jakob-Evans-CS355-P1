var mysql = require('mysql');
var db = require('./db_connection.js');
/* DATA BASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM ticket_sales;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

exports.update = function(params, callback) {
    var query = 'UPDATE ticket_sales SET PRICE = ?, MOVIE_ID = ?, AUDITORIUM_ID = ? WHERE TICKET_NUM = ?';
    var queryData = [params.PRICE, params.MOVIE_ID, params.AUDITORIUM_ID, params.TICKET_NUM];
    connection.query(query, queryData, function(err, result) {

        callback(err,result);
    });
};


exports.getinfo = function(TICKET_NUM, callback) {
    var query = 'CALL ticketsales_getinfo(?)';
    var queryData = [TICKET_NUM];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);

/*
    var query1 = 'CALL movie_getinfo(?)';
    var queryData1 = [MOVIE_ID];

    connection.query1(query1, queryData1, function (err, result) {
        callback(err, result);
    })
    */
})


};
exports.insert = function(params, callback) {
    var query = 'INSERT INTO ticket_sales(TICKET_NUM, PRICE, MOVIE_ID, CINEMA_ID, AUDITORIUM_ID) VALUES (?, ?, ?, ?, ?)';

    var queryData = [params.TICKET_NUM, params.PRICE, params.MOVIE_ID, params.CINEMA_ID, params.AUDITORIUM_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err,result);
    });
};


exports.delete = function(params, callback) {
    var query = 'Delete FROM ticket_sales WHERE TICKET_NUM = ?';

    var queryData = [params.TICKET_NUM];

    connection.query(query, queryData, function(err, result) {
        callback(err,result);
    });
};

