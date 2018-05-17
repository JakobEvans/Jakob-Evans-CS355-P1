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

var auditoriumMovieInsert = function(AUDITORIUM_ID, movieIdArray, callback){
    var query = 'INSERT INTO company_address (AUDITORIUM_ID, MOVIE_ID) VALUES ?';
    //to bulk insert records
    var auditoriumMovieData = [];
    if (movieIdArray.constructor === Array) {
        for (var i = 0; i < movieIdArray.length; i++) {
            auditoriumMovieData.push([AUDITORIUM_ID, movieIdArray[i]]);

        }
    }
    else {
        auditoriumMovieData.push([AUDITORIUM_ID, movieIdArray]);

    }
    connection.query(query, [auditoriumMovieData], function(err, result){
        callback(err, result);
    });
};

var auditoriumMovieUpdate = function(auditorium_id, movieIdArray, callback){
    //first need to remove all entries, then re insert new ones
    var query = 'CALL auditorium_movie_delete(?)';
    connection.query(query, AUDITORIUM_ID, function(err, result) {
        if(err || movieIdArray === undefined) {
            //if no errors then return
            callback(err, result);
        }else {
            auditoriumMovieInsert(AUDITORIUM_ID, movieIdArray, callback);
        }

    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE auditorium SET CAPACITY = ?, CINEMA_ID = ?, MOVIE_ID = ? WHERE AUDITORIUM_ID = ?';
    var queryData = [params.CAPACITY, params.CINEMA_ID, params.MOVIE_ID, params.AUDITORIUM_ID];
    connection.query(query, queryData, function(err, result) {
        auditoriumMovieUpdate(params.AUDITORIUM_ID, params.MOVIE_ID, function(err, result) {
            callback(err, result);
        })
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
        if(err || params.MOVIE_ID === undefined) {
            console.log(err);
            callback(err,result);

        } else {
            var AUDITORIUM_ID = result.insertId;
            var query = 'INSERT INTO movie_auditorium (auditorium_id, movie_id) VALUES ?';

            var auditoriumMovieData = [];

            if (params.MOVIE_ID.constructor === Array) {
                for (var i = 0; i < params.MOVIE_ID.length; i++) {
                    auditoriumMovieData.push(
                        [AUDITORIUM_ID, params.MOVIE_ID[i]]
                    );

                }
            }
            else {
                auditoriumMovieData.push([AUDITORIUM_ID, params.MOVIE_ID]);
            }
            connection.query(query, [auditoriumMovieData],
                function (err, result) {
                    callback(err, result);

                });
        }

    });

};


exports.delete = function(params, callback) {
    var query = 'Delete FROM auditorium WHERE AUDITORIUM_ID = ?';

    var queryData = [params.AUDITORIUM_ID];

    connection.query(query, queryData, function(err, result) {
        callback(err,result);
    });
};


