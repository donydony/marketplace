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
  featuredData, newData, filterData, priceData, priceDataDesc, convoSearch
} = require("../db/queries/main.js");


router.get('/', (req, res) => {
  const user_name = req.session.user_name;

  const templateVars = {
    user: user_name
  }
  res.render('index', templateVars);
});

//buttons
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


//filter
router.post('/filter', (req, res) => {
  let filter = req.body.filter_by;
  filterData(1, filter[0], filter[1], filter[2], filter[3]).then(data => {
    return res.json(data);
  })
});



// //favourites
// router.post('/fav', (req, res) => {
//   console.log(req.body);
//   //retreive user_id from cookie
//   //retrieve seller id  and item from item
//   //convoSearch(seller, user, item).then(data => {
//     //return res.json(data);
//   //})

//   let data = req.body;
//   return res.json(data);
// });

module.exports = router;
