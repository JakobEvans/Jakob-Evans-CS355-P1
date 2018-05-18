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



router.get('/edit', function(req, res) {
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
                            ticket_sales_dal.getAll(function (err, ticket_sales) {
                                if (err) {
                                    res.send(err);
                                }
                                else {
                                    res.render('ticket_sales/ticket_sales_update', {
                                        cinema: cinema,
                                        movie: movie,
                                        auditorium: auditorium,
                                        ticket_sales: ticket_sales[0]
                                    });
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});
/* THIS WAS LAST CLOSEST
router.get('/edit', function(req, res) {
    movie_dal.getinfo(req.query.MOVIE_ID,function (err, movie) {
        if (err) {
            res.send(err);
        }
        else {
            cinema_dal.getinfo(req.query.CINEMA_ID, function (err, cinema) {
                if (err) {
                    res.send(err)
                }
                else {
                    auditorium_dal.getinfo(req.query.AUDITORIUM_ID, function (err, auditorium) {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            ticket_sales_dal.getinfo(req.query.TICKET_NUM, function (err, ticket_sales) {
                                if (err) {
                                    res.send(err)
                                }
                                else {
                                    res.render('ticket_sales/ticket_sales_update', {
                                        movie: movie[1],
                                        cinema: cinema[1],
                                        auditorium: auditorium[1],
                                        ticket_sales: ticket_sales[0][0]

                                    });
                                }

                            });
                        }
                    });

                }
            });
        }

    });

});
*/

/*
router.get('/edit', function(req, res){
    ticket_sales_dal.getinfo(req.query.TICKET_NUM,function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            movie_dal.getAll(function (err, movie) {
                if (err) {
                    res.send(err);
                }
                else {
                    cinema_dal.getAll( function (err, cinema) {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            auditorium_dal.getinfo(req.query.AUDITORIUM_ID, function (err, auditorium) {
                                if (err) {
                                    res.send(err)
                                }
                                else {
                                    res.render('ticket_sales/ticket_sales_update',
                                        {
                                            ticket_sales: ticket_sales[0][0],
                                            movie: movie[0],
                                            cinema: cinema[0],
                                            auditorium: auditorium[0]
                                        });
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

*/
/*
router.get('/edit', function(req, res){
    ticket_sales_dal.getinfo(req.query.TICKET_NUM, function(err, result) {
        if(err) { res.send(err);}
        else {
            res.render('ticket_sales/ticket_sales_update',
                {ticket_sales: result[0][0], movie: result[0], cinema: result[0], auditorium: result[0]}
            );
        }
    });
});
*/
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

router.get('/delete', function(req, res) {
    ticket_sales_dal.delete(req.query, function (err, result) {
        if (err) {
            /* console.log(err);*/
            res.send(err);
        }
        else {
            res.redirect(302, '/ticket_sales/all' + "?&was_successful_delete=1");
        }

    });
});

module.exports = router;