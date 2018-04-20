var express = require('express');
var router = express.Router();
var ticket_sales_dal = require('../dal/ticket_sales_dal');
var cinema_dal = require('../dal/cinema_dal');
var movie_dal = require('../dal/movie_dal');
var auditorium_dal = require('../dal/auditorium_dal');


/* GET USERS LISTING */
router.get('/all', function(req, res) {
    ticket_sales_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('ticket_sales/ticket_sales_view_all', {ticket_sales: result});
        }
    })
});

router.get('/add', function(req, res) {
    movie_dal.getAll(function (err, movie) {
        if (err) {
            res.send(err);
        }
        else {
            cinema_dal.getAll(function (err, cinema) {
                if (err) {
                    res.send(err)
                }
                else {
                    auditorium_dal.getAll(function (err, auditorium) {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            res.render('ticket_sales/ticket_sales_add', {
                                cinema: cinema,
                                movie: movie,
                                auditorium: auditorium
                            });
                        }
                    })
                }
            })
        }
    })
});




router.get('/insert', function(req, res) {
    ticket_sales_dal.insert(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/ticket_sales/all');
        }

    });
});

router.get('/edit', function(req, res){
    ticket_sales_dal.getinfo(req.query.TICKET_NUM, function(err, result) {
        if(err) { res.send(err);}
        else {
            res.render('ticket_sales/ticket_sales_update',
                {ticket_sales: result[0][0]}
            );
        }
    });
});

router.get('/update', function(req, res) {
    ticket_sales_dal.update(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/ticket_sales/all');
        }
    });
});


module.exports = router;