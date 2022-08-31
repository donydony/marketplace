const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

router.get('/', (req, res) => {
const user_id = req.session.user_id;

  const templateVars = {
    user: user_id
  }
  res.render('register',templateVars);
});

router.post('/', (req, res) => {
  const user_id = req.session.user_id;

  const newUser = req.body.email;
  const password = req.body.password;
  res.redirect('/');
});


module.exports = router;
