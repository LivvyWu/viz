var express = require('express');
var router = express.Router();
var dataForge = require('data-forge');
var request = require('request-promise');
var path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('index', {title: 'Express'});
});

router.get('/rstudio', function (req, res, next) {

    res.render('rstudio', {title: 'Express'});
});
router.get('/tableau', function (req, res, next) {


    res.render('tableau', {title: 'Express'});
});

router.get('/tools', function (req, res, next) {

    res.render('tools', {title: 'Express'});
});

router.get('/notes', function (req, res, next) {

    res.render('notes', {title: 'Express'});
});

router.get('/charts', function (req, res, next) {

    res.render('charts', {title: 'Express'});
});



router.get('/tableauwdc', function (req, res, next) {


    res.render('tableauwdc', {title: 'tableauwdc'});
});

router.get('/d3', function (req, res, next) {

    res.render('d3', {title: 'Express'});
});


router.get('/charts/data', function (req, res, next) {

    var dataFrame = dataForge
        .readFileSync(path.resolve(__dirname, '../public/statics/veg_FJ3.csv'))
        .parseCSV();

    var sorteddf =dataFrame.orderBy(row => row.trans_date);

    var newDF = sorteddf.where(function(row){
        return row['market_code'] == '104' && row['detail_code'] == 'FJ3';
    });

    res.json(newDF.toJSON());
});



module.exports = router;
