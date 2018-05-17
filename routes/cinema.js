var express = require('express');
var router = express.Router();
var cinema_dal = require('../dal/cinema_dal');

/* GET USERS LISTING */
router.get('/all', function(req, res) {
    cinema_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('cinema/cinema_view_all', {cinema: result});
        }
    })
});
router.get('/add', function(req, res) {
            res.render('cinema/cinema_add');

    });


router.get('/insert', function(req, res) {
    cinema_dal.insert(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/cinema/all');
        }

    });
});

router.get('/edit', function(req, res){
    cinema_dal.getinfo(req.query.cinema_id, function(err, result) {
        if(err) { res.send(err);}
        else {
            res.render('cinema/cinema_update',
                {cinema: result[0][0]}
            );
        }
    });
});

router.get('/update', function(req, res) {
    cinema_dal.update(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        else{
            res.redirect(302, '/cinema/all');
        }
    });
});

router.get('/delete', function(req, res) {
    cinema_dal.delete(req.query, function (err, result) {
        if (err) {
           /* console.log(err);*/
            res.send(err);
        }
        else {
            res.redirect(302, '/cinema/all' + "?&was_successful_delete=1");
        }

    });
});

module.exports = router;