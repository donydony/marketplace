/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//imported query data
const {
  featuredData, newData, userData, priceData, priceDataDesc, priceRangeData, priceRangeDataDesc
} = require("../db/queries/main.js");

router.get('/', (req, res) => {
  res.render('index');
});
router.post('/featured', (req, res) => {
  featuredData(1).then(data => {
    return res.json(data);
  })
});


router.post('/new', (req, res) => {
  newData(1).then(data => {
    return res.json(data);
  })
});

router.post('/user', (req, res) => {
  userData(1).then(data => {
    return res.json(data);
  })
});

router.post('/price', (req, res) => {
  priceData(1).then(data => {
    return res.json(data);
  })
});

router.post('/pricedesc', (req, res) => {
  priceDataDesc(1).then(data => {
    return res.json(data);
  })
});

router.post('/pricerange', (req, res) => {
  priceRangeData(1).then(data => {
    return res.json(data);
  })
});


router.post('/pricerangedesc', (req, res) => {
  priceRangeDataDesc(1).then(data => {
    return res.json(data);
  })
});

module.exports = router;
