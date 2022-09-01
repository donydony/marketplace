const express = require('express');
const messagesQueries = require('../db/queries/messages');
const router = express.Router();

router.get('/:id', (req, res) => {
  const user_id = req.session.user_id;
  const username = req.session.user_name;

  messagesQueries.getAllMessages(req.params.id)
    .then(messages => {
      const templateVars = { allMessages: { messages }['messages'], convo_id: req.params.id, user_id: user_id , user: username
     };
      res.render('messages', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  messagesQueries.insertMessage(req.body.convo_id, req.body.sender_id, req.body.new_message).then(message => {
    console.log(message);
    res.status(201).json(message[0]);
  })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
