const express = require('express');
const router  = express.Router();


/*****************************
 * FOR RENDERING LOGIN PAGE
*****************************/
router.get('/', (req, res) => {
  const user_id = req.session.user_id;

  const templateVars = {
    user: user_id
  }
  res.render('login',templateVars);
});

/*****************************
 * /LOGIN ROUTE (for logining in)
*****************************/
router.post('/', (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  req.session.user_id = email;
  res.redirect('/');
  //need to compare password and email in data base
  //if it is in database then create the cookie and redirect to home page
});

module.exports = router;
