var express = require('express');
var router = express.Router();
var queries_dal = require('../dal/queries_dal');
var auditorium_dal = require('../dal/auditorium_dal');
var cinema_dal = require('../dal/cinema_dal');
var movie_dal = require('../dal/movie_dal');

router.get('/query1', function(req, res) {
    queries_dal.query1(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery1', {result: result});
        }
    })
});

router.get('/query2', function(req, res) {
    queries_dal.query2(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery2', {result: result});
        }
    })
});

router.get('/query3', function(req, res) {
    queries_dal.query3(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery3', {result: result});
        }
    })
});

router.get('/query4', function(req, res) {
    queries_dal.query4(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery4', {result: result});
        }
    })
});

router.get('/query5', function(req, res) {
    queries_dal.query5(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery5', {result: result});
        }
    })
});

router.get('/query6', function(req, res) {
    queries_dal.query6(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery6', {result: result});
        }
    })
});

router.get('/query7', function(req, res) {
    queries_dal.query7(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery7', {result: result});
        }
    })
});

router.get('/query8', function(req, res) {
    queries_dal.query8(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery8', {result: result});
        }
    })
});

router.get('/query9', function(req, res) {
    queries_dal.query9(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery9', {result: result});
        }
    })
});

router.get('/query10', function(req, res) {
    queries_dal.query10(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Queries/vquery10', {result: result});
        }
    })
});

module.exports = router;