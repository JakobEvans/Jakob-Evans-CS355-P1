var express = require('express');
var router = express.Router();
var movie_dal = require('../dal/movie_dal');

/* GET USERS LISTING */
router.get('/all', function(req, res) {
    movie_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('movie/movie_view_all', {movie: result});
        }
    })
});
router.get('/add', function(req, res) {
    res.render('movie/movie_add');

});


router.get('/insert', function(req, res) {
    movie_dal.insert(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/movie/all');
        }

    });
});

router.get('/edit', function(req, res){
    movie_dal.getinfo(req.query.MOVIE_ID, function(err, result) {
        if(err) { res.send(err);}
        else {
            res.render('movie/movie_update',
                {movie: result[0][0]}
            );
        }
    });
});

router.get('/update', function(req, res) {
    movie_dal.update(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        else{
            res.redirect(302, '/movie/all');
        }
    });
});

module.exports = router;