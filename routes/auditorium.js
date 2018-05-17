var express = require('express');
var router = express.Router();
var auditorium_dal = require('../dal/auditorium_dal');
var cinema_dal = require('../dal/cinema_dal');
var movie_dal = require('../dal/movie_dal');


/* GET USERS LISTING */
router.get('/all', function(req, res) {
    auditorium_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('auditorium/auditorium_view_all', {auditorium: result});
        }
    })
});

router.get('/add', function(req, res) {
    cinema_dal.getAll(function(err, cinema) {
        if (err) {
            res.send(err);
        }
        else {
            movie_dal.getAll(function(err, movie) {
                if (err) {
                    res.send(err)
                }
                else {
                    res.render('auditorium/auditorium_add', {movie: movie, cinema: cinema});

                }
        })

        }

        })

});



router.get('/insert', function(req, res) {
    auditorium_dal.insert(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/auditorium/all');
        }

    });
});

router.get('/edit', function(req, res){
    cinema_dal.getinfo(req.query.CINEMA_ID, function(err, cinema) {
        movie_dal.getinfo(req.query.MOVIE_ID, function (err, movie) {
            auditorium_dal.getinfo(req.query.AUDITORIUM_ID, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.render('auditorium/auditorium_update',
                        {auditorium: result[0][0], movie: movie, cinema: cinema}
                    );
                }
            });
        });
    });
});

router.get('/update', function(req, res) {
    auditorium_dal.update(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        else{
            res.redirect(302, '/auditorium/all');
        }
    });
});

router.get('/delete', function(req, res) {
    auditorium_dal.delete(req.query, function (err, result) {
        if (err) {
            /* console.log(err);*/
            res.send(err);
        }
        else {
            res.redirect(302, '/auditorium/all' + "?&was_successful_delete=1");
        }

    });
});

module.exports = router;