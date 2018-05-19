var mysql = require('mysql');
var db = require('./db_connection.js');
/* DATA BASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.query1 = function(callback) {
    var query = 'SELECT MOVIE_ID, MOVIE_NAME, RATING\n' +
        'from movie\n' +
        'where MOVIE_ID IN (SELECT MOVIE_ID FROM ticket_sales);';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};

exports.query2 = function(callback) {
    var query = 'Select  t.TICKET_NUM,t.PRICE, m.MOVIE_NAME,\n' +
        '(SELECT max(ticket_sales.price) from ticket_sales) as max_price,\n' +
        '(SELECT min(ticket_sales.price) from ticket_sales) as min_price\n' +
        'from ticket_sales t join movie m on t.MOVIE_ID = m.MOVIE_ID;';

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
    var query = 'SELECT AUDITORIUM_ID, CAPACITY, movie.MOVIE_ID, movie.MOVIE_NAME, cinema.CINEMA_ID, cinema.CINEMA_NAME\n' +
        'from auditorium\n' +
        'inner join cinema on auditorium.CINEMA_ID = cinema.CINEMA_ID\n' +
        'inner join movie on auditorium.MOVIE_ID = movie.MOVIE_ID\n' +
        'Where CAPACITY < (Select avg(auditorium.CAPACITY) as avg from auditorium)\n' +
        'order by AUDITORIUM_ID;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};


exports.query6 = function(callback) {
    var query = 'SELECT MOVIE_ID, MOVIE_NAME, movie.M_GENRE\n' +
        'from movie where movie.M_GENRE = \'Fantasy/Sci-fi\'\n' +
        'GROUP BY MOVIE_NAME;';

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
    var query = 'SELECT CINEMA_ID, MOVIE_ID, AUDITORIUM_ID\n' +
        'FROM auditorium\n' +
        'UNION (\n' +
        'SELECT CINEMA_ID, MOVIE_ID, AUDITORIUM_ID\n' +
        'FROM auditorium)\n' +
        'order by CINEMA_ID;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};


exports.query10 = function(callback) {
    var query = 'SELECT DISTINCT MOVIE_ID, AUDITORIUM_ID\n' +
        'FROM movie_auditorium\n' +
        'ORDER BY movie_id;';

    connection.query(query, function (err, result)  {
        callback(err, result);
    });


};