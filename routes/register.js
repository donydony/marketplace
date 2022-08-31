const express = require('express');
const userQueries = require('../db/queries/users');
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
  console.log(req.body);
  const userName = req.body.userName;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password,salt);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userPic = req.body.userPic;
  const address = req.body.address;
  const aboutMe = req.body.aboutMe;
  console.log('hashed pass:', hashedPassword);

  userQueries.findUserName(userName).then(result => {
    if(result[0]) {
       res.status(403).send(`User ${userName} already exists`);
       return;
    }else {
      userQueries.insertNewUser(
        userName,
        hashedPassword,
        firstName,
        lastName,
        userPic,
        address,
        aboutMe
        ).then(result => {
          console.log('Added new user', result);
          req.session.user_id = userName;
          res.status(201).send('SUCCESS');
          return;
        });
    }
  });

});


module.exports = router;
