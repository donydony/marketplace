const express = require('express');
const messagesQueries = require('../db/queries/messages');
const router  = express.Router();

router.get('/:id', (req, res) => {
  messagesQueries.getAllMessages(req.params.id)
    .then(messages => {
      const templateVars = {allMessages: { messages }['messages']};
      console.log({ messages }['messages']);
      res.render('messages', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;