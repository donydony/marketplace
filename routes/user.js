/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const itemQueries = require('../db/queries/items');


const {
  favData, MarkSoldData
} = require("../db/queries/userfavs.js");

/*****************************
 * GET ROUTE FOR RENDERING PAGE
*****************************/

router.get('/', (req, res) => {
  const user_name = req.session.user_name;
  console.log('cookie:',req.session);
  const templateVars = {
    user: user_name
  }

  if(!user_name){
    return res.status(400).send('Error must be logged in')
  }


  res.render('user', templateVars);
});

/*****************************
 * POST ROUTE FOR UPDATING ABOUT ME
*****************************/
router.post('/', (req,res) => {
  const user_name = req.session.user_name;
  const aboutMe = req.body.aboutMe;

  if(!user_name){
    return res.status(400).send('Error must be logged in')
  }

  userQueries.updateUserDescription(user_name, aboutMe).then(result => {
    //console.log(result);
    res.redirect('/user');
  });
});

router.post('/fav', (req, res) => {
  const user_name = req.session.user_name;
  if(!user_name) {
    return res.status(400).send("Error : Please Login");
  }
  favData(user_name).then(data => {
    return res.json(data);
  })
});

router.post('/fav/sold', (req, res) => {
  MarkSoldData(req.body.item_id).then(data => {
    return res.json(data);

  })
});

router.post('/fav/delete', (req,res) => {
  const user_name = req.session.user_name;
  const item_id = req.body.item_id;

  if(!user_name) {
    return res.status(400).send("Error : Please Login");
  }
  itemQueries.deleteItem( item_id).then(result => {
    res.status(201).send();
  });
})

module.exports = router;
