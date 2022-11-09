var router = require('express').Router();
var data = require('../data/data')

router.get('/', function (req, res) {
    res.json(data.products)
})

module.exports = router;